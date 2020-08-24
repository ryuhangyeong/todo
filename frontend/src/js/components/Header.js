export default class Header {
    $target = null;
    $wrap = null;
    $header = null;
    $title = null;

    constructor({ $target }) {
        this.$target = $target;
    }

    dom(document) {
        this.$wrap = document.createElement("section");

        this.$header = document.createElement("header");

        this.$title = document.createElement("h1");
        this.$title.innerText = "Todo.";

        this.$header.appendChild(this.$title);
        this.$wrap.appendChild(this.$header);
        this.$target.appendChild(this.$wrap);

        return this;
    }
}
