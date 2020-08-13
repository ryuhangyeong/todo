export default class Header {
    $header = null;
    $title = null;

    constructor({ $target }) {
        this.$header = document.createElement("header");

        this.$title = document.createElement("h1");
        this.$title.innerText = "Todo.";

        this.$header.appendChild(this.$title);
        $target.appendChild(this.$header);
    }
}
