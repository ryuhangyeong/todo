export default class Main {
    $main = null;

    constructor({ $target }) {
        this.$main = document.createElement("div");
        this.$main.className = "container";

        $target.appendChild(this.$main);
    }
}
