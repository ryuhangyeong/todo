export default class Header {
    $wrap = null;
    $header = null;
    $title = null;

    constructor({ $target }) {
        this.$wrap = document.createElement("section");

        this.$header = document.createElement("header");

        this.$title = document.createElement("h1");
        this.$title.innerText = "Todo.";

        this.$header.appendChild(this.$title);
        this.$wrap.appendChild(this.$header);
        $target.appendChild(this.$wrap);
    }
}
