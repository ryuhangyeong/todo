export default class Main {
    $target = null;
    $main = null;

    constructor({ $target }) {
        this.$target = $target;
    }

    dom(document) {
        this.$main = document.createElement("div");
        this.$main.className = "container";

        this.$target.appendChild(this.$main);

        return this;
    }
}
