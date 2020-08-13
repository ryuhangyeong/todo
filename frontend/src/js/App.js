import Header from "./components/Header";
import Main from "./components/Main";
import Statistics from "./components/Statistics";
import Form from "./components/Form";
import Todo from "./components/Todo";
import statistics from "./utils/statistics";
import request from "./utils/request";

export default class App {
    state = {
        list: [],
        statistics: [],
    };

    constructor($target) {
        this.init($target);
    }

    async init($target) {
        const list = await request({ url: "/", opts: {} });

        this.state.list = list;
        this.state.statistics = statistics(this.state.list);

        this.$target = $target;

        this.header = new Header({ $target: this.$target });

        this.main = new Main({ $target: this.$target });

        this.statistics = new Statistics({
            $target: this.main.$main,
            initialData: this.state.statistics,
            onMode: (mode) => {
                this.todo.filter(mode);
            },
        });

        this.form = new Form({
            $target: this.main.$main,
            onCreate: async (title) => {
                const { insertId: id } = await request({
                    url: "/",
                    opts: {
                        method: "POST",
                        body: JSON.stringify({ title }),
                    },
                });

                this.todo.create({
                    id,
                    title,
                    completed: false,
                });
            },
        });

        this.todo = new Todo({
            $target: this.main.$main,
            initialData: this.state.list,
            statistics: this.statistics,
        });
    }
}
