import statistics from "../utils/statistics";
import { request, API_ENDPOINT } from "../utils/request";

export default class Todo {
    $wrap = null;
    $todo = null;
    list = null;
    routes = null;
    statistics = null;

    constructor({ $target, initialData, statistics }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "todo";

        this.$todo = document.createElement("ul");

        this.$wrap.appendChild(this.$todo);
        $target.appendChild(this.$wrap);

        this.list = initialData.list;
        this.routes = initialData.routes;

        this.statistics = statistics;

        this.render();
        this.filter(this.routes);

        this.event();
    }

    event() {
        this.$todo.addEventListener("click", (e) => {
            const {
                className,
                parentNode: {
                    dataset: { id },
                },
            } = e.target;

            if (className === "todo__delete") this.delete(+id, e.target);
            else if (className === "todo__label") this.toggle(+id);
        });
    }

    create(newData) {
        this.list = [newData, ...this.list];
        this.render();
        this.statistics.setState(statistics(this.list));
    }

    render() {
        if (!this.list.length) return;
        this.$todo.innerHTML = this.list
            .map(
                (t) =>
                    `
                    <li class="todo__item" data-id="${t.id}">
                        <input type="checkbox" class="todo__completed" id="todo-${
                            t.id
                        }" ${t.completed ? "checked" : ""}>
                        <label for="todo-${t.id}" class="todo__label"></label>
                        <p>${t.title}</p>
                        <div class="todo__delete">&times;</div>
                    </li>
                `
            )
            .join("");
    }

    filter(routes) {
        for (const todo of document.querySelectorAll(".todo__item"))
            todo.style.display = "flex";

        this.list.forEach((d) => {
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

        const index = this.list.findIndex((d) => d.id === id);

        this.list[index].completed = this.list[index].completed ? 0 : 1;
        this.statistics.setState(statistics(this.list));
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

        this.list.splice(
            this.list.findIndex((d) => d.id === id),
            1
        );
        this.statistics.setState(statistics(this.list));
        this.statistics.active(this.routes);
    }
}
