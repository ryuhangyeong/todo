import Header from "./components/Header";
import Main from "./components/Main";
import Statistics from "./components/Statistics";
import Form from "./components/Form";
import Todo from "./components/Todo";
import statistics from "./utils/statistics";
import todoModel from "./models/todo";
import { request, API_ENDPOINT } from "./utils/request";
import { getHash } from "./utils/routes";

export default class App {
    $target = null;

    state = {
        todo: new todoModel(),
        statistics,
        routes: "All",
    };

    constructor($target) {
        this.$target = $target;

        this.init();
        this.event();
    }

    async init() {
        const list = await request({ url: API_ENDPOINT, opts: {} });

        this.state.todo.init(list);

        this.state.statistics = statistics(this.state.todo.list);

        this.header = new Header({ $target: this.$target }).dom(document);

        this.main = new Main({ $target: this.$target }).dom(document);

        this.statistics = new Statistics({
            $target: this.main.$main,
            initialData: this.state.statistics,
        })
            .dom(document)
            .render();

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

                window.location.hash = "#All";
                this.state.routes = "All";
            },
        })
            .dom(document)
            .event();

        this.todo = new Todo({
            $target: this.main.$main,
            initialData: {
                todo: this.state.todo,
            },
            statistics: this.statistics,
        })
            .dom(document)
            .event()
            .render();

        this.initRoutes();

        return this;
    }

    initRoutes() {
        const hash = getHash();

        this.state.routes = hash;
        this.todo.filter(hash);
        this.statistics.active(hash);
    }

    event() {
        window.onhashchange = () => {
            const hash = getHash();

            this.todo.filter(hash);
            this.statistics.active(hash);
        };

        return this;
    }
}
