import statistics from "../utils/statistics";

export default class Todo {
    $wrap = null;
    $todo = null;
    list = null;
    mode = null;
    statistics = null;

    constructor({ $target, initialData, statistics }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "todo";

        this.$todo = document.createElement("ul");

        this.$wrap.appendChild(this.$todo);
        $target.appendChild(this.$wrap);

        this.list = initialData.list;
        this.mode = initialData.mode;

        this.statistics = statistics;

        this.render();
        this.filter(this.mode);

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
                            <label for="todo-${
                                t.id
                            }" class="todo__label"></label>
                            <p>${t.title}</p>
                            <div class="todo__delete">&times;</div>
                        </li>
                    `
            )
            .join("");
    }

    filter(mode) {
        for (const todo of document.querySelectorAll(".todo__item"))
            todo.style.display = "flex";

        this.list.forEach((d) => {
            if (mode === "Active" && d.completed) this._hide(d.id);
            if (mode === "Completed" && !d.completed) this._hide(d.id);
        });

        this.mode = mode;
    }

    _hide(id) {
        document.querySelector(`[data-id="${id}"]`).style.display = "none";
    }

    async toggle(id) {
        await fetch(`/api/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const index = this.list.findIndex((d) => d.id === id);
        this.list[index].completed = this.list[index].completed ? 0 : 1;
        this.statistics.setState(statistics(this.list));

        this.filter(this.mode);
    }

    async delete(id, target) {
        await fetch(`/api/todo/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        target.parentNode.classList.add("todo__item--delete");
        setTimeout(function () {
            target.parentNode.remove();
        }, 1000);
        this.list.splice(
            this.list.findIndex((d) => d.id === id),
            1
        );
        this.statistics.setState(statistics(this.list));
    }
}
