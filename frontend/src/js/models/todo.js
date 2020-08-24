class Todo {
    list;

    constructor(list = []) {
        this.list = list;
    }

    init(todo) {
        this.list = [...todo];
    }

    getList() {
        return this.list;
    }

    create(todo) {
        this.list = [todo, ...this.getList()];
    }

    destory(id) {
        const idx = this.getIdxById(id);

        if (idx !== -1) this.list.splice(idx, 1);
    }

    updateCompleted(id) {
        const idx = this.getIdxById(id);

        if (idx !== -1)
            this.list[idx].completed = this.list[idx].completed ? 0 : 1;
    }

    size() {
        return this.getList().length;
    }

    getIdxById(id) {
        return this.list.findIndex((d) => d.id === id);
    }

    clear() {
        this.list.splice(0);
    }
}

export default Todo;
