export default class Modal {
    $target = null;
    $wrap = null;
    $inner = null;

    constructor({ $target }) {
        this.$target = $target;
    }

    dom(document) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "modal";

        this.$inner = document.createElement("div");
        this.$inner.className = "modal__inner";

        this.$wrap.appendChild(this.$inner);
        this.$target.appendChild(this.$wrap);

        return this;
    }

    open() {
        this.$wrap.style.display = "flex";

        return this;
    }

    close() {
        this.$wrap.style.display = "none";

        return this;
    }
}
