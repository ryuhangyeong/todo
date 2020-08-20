import statistics from "../utils/statistics";
import { request, API_ENDPOINT } from "../utils/request";

export default class Todo {
    $wrap = null;
    $todo = null;
    todo = null;
    routes = null;
    statistics = null;
    modal = null;
    dimmed = null;

    constructor({ $target, initialData, statistics }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "todo";

        this.$todo = document.createElement("ul");

        this.$wrap.appendChild(this.$todo);
        $target.appendChild(this.$wrap);

        this.todo = initialData.todo;
        this.routes = initialData.routes;

        this.statistics = statistics;

        this.render();
        this.filter(this.routes);

        this.event($target);
    }

    event($target) {
        this.$todo.addEventListener("click", async (e) => {
            const {
                className,
                parentNode: {
                    dataset: { id },
                },
            } = e.target;

            if (className === "todo__delete") {
                this.delete(+id, e.target);
            } else if (className === "todo__label") {
                this.toggle(+id);
            } else if (className === "todo__title") {
                if (!this.modal) {
                    this.moduleModal = await import(
                        /* webpackChunkName: "modal" */ "./Modal"
                    );

                    this.modal = new this.moduleModal.default({
                        $target,
                    });

                    this.moduleDimmed = await import(
                        /* webpackChunkName: "dimmed" */ "./Dimmed"
                    );

                    this.dimmed = new this.moduleDimmed.default({
                        $target: this.modal.$wrap,
                        modal: this.modal,
                    });
                }

                this.modal.$inner.innerText = e.target.innerText;
                this.modal.open();
            }
        });
    }

    create(newData) {
        this.todo.create(newData);
        this.render();
        this.statistics.setState(statistics(this.todo.getList()));
    }

    render() {
        if (!this.todo.size()) return;
        this.$todo.innerHTML = this.todo
            .getList()
            .map(
                (t) =>
                    `
                    <li class="todo__item" data-id="${t.id}">
                        <input type="checkbox" class="todo__completed" id="todo-${
                            t.id
                        }" ${t.completed ? "checked" : ""}>
                        <label for="todo-${t.id}" class="todo__label"></label>
                        <p class="todo__title">${t.title}</p>
                        <div class="todo__delete">&times;</div>
                    </li>
                `
            )
            .join("");
    }

    filter(routes) {
        for (const todo of document.querySelectorAll(".todo__item"))
            todo.style.display = "flex";

        this.todo.getList().forEach((d) => {
            if (routes === "Active" && d.completed) this._hide(d.id);
            if (routes === "Completed" && !d.completed) this._hide(d.id);
        });

        this.routes = routes;
    }

    _hide(id) {
        document.querySelector(`[data-id="${id}"]`).style.display = "none";
    }

    async toggle(id) {
        await request({
            url: `${API_ENDPOINT}/${id}`,
            opts: {
                method: "PUT",
            },
        });

        this.todo.updateCompleted(id);
        this.statistics.setState(statistics(this.todo.getList()));
        this.statistics.active(this.routes);

        this.filter(this.routes);
    }

    async delete(id, target) {
        await request({
            url: `${API_ENDPOINT}/${id}`,
            opts: {
                method: "DELETE",
            },
        });

        target.parentNode.classList.add("todo__item--hide");

        setTimeout(() => this.$todo.removeChild(target.parentNode), 1000);

        this.todo.destory(id);
        this.statistics.setState(statistics(this.todo.getList()));
        this.statistics.active(this.routes);
    }
}
