import statistics from "../utils/statistics";
import request from "../utils/request";

export default class Todo {
    $wrap = null;
    $todo = null;
    data = null;
    statistics = null;

    constructor({ $target, initialData, statistics }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "todo";

        this.$todo = document.createElement("ul");

        this.$wrap.appendChild(this.$todo);
        $target.appendChild(this.$wrap);

        this.data = initialData;

        this.statistics = statistics;

        this.render();
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

            if (className === "todo__delete") this.fetchDelete(+id);
            else if (className === "todo__label")
                this.fetchToggleCompleted(+id);
        });
    }

    create(newData) {
        this.setState([newData, ...this.data]);
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        if (!this.data.length) return;
        this.$todo.innerHTML = this.data
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

        this.data.forEach((d) => {
            if (mode === "Active" && d.completed) this._hide(d.id);
            if (mode === "Completed" && !d.completed) this._hide(d.id);
        });
    }

    _hide(id) {
        document.querySelector(`[data-id="${id}"]`).style.display = "none";
    }

    async fetchToggleCompleted(id) {
        await request({
            url: `/${id}`,
            opts: {
                method: "PUT",
            },
        });

        const index = this.data.findIndex((d) => d.id === id);
        this.data[index].completed = this.data[index].completed ? 0 : 1;

        this.statistics.setState(statistics(this.data));
    }

    async fetchDelete(id) {
        await request({
            url: `/${id}`,
            opts: {
                method: "DELETE",
            },
        });
    }
}
