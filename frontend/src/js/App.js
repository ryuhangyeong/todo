import Header from "./components/Header";
import Main from "./components/Main";
import Statistics from "./components/Statistics";
import Form from "./components/Form";
import Todo from "./components/Todo";
import statistics from "./utils/statistics";
import { request, API_ENDPOINT } from "./utils/request";

export default class App {
    state = {
        list: [],
        statistics: [],
        mode: "All",
    };

    constructor($target) {
        this.init($target);
    }

    async init($target) {
        const list = await request({ url: API_ENDPOINT, opts: {} });

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
                    url: API_ENDPOINT,
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
            initialData: {
                list: this.state.list,
                mode: this.state.mode,
            },
            statistics: this.statistics,
        });
    }
}
