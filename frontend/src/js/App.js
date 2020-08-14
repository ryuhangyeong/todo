import Header from "./components/Header";
import Main from "./components/Main";
import Statistics from "./components/Statistics";
import Form from "./components/Form";
import Todo from "./components/Todo";
import statistics from "./utils/statistics";
import { request, API_ENDPOINT } from "./utils/request";
import { getHash } from "./utils/routes";

export default class App {
    state = {
        list: [],
        statistics: [],
        routes: "All",
    };

    constructor($target) {
        this.init($target);
        this.event();
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

                window.location.hash = "#All";
                this.state.routes = "All";
            },
        });

        this.todo = new Todo({
            $target: this.main.$main,
            initialData: {
                list: this.state.list,
                routes: this.state.routes,
            },
            statistics: this.statistics,
        });

        this.initRoutes();
    }

    initRoutes() {
        const hash = getHash();

        this.state.routes = hash;
        this.todo.filter(hash);
    }

    event() {
        window.onhashchange = () => {
            const hash = getHash();
            this.todo.filter(getHash());
            this.statistics.active(hash);
        };
    }
}
