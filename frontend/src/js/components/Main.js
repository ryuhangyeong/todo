export default class Main {
    $main = null;

    constructor({ $target }) {
        this.$main = document.createElement("main");
        this.$main.className = "container";

        $target.appendChild(this.$main);
    }
}
