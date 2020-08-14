export default class Modal {
    $wrap = null;
    $inner = null;

    constructor({ $target }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "modal";

        this.$inner = document.createElement("div");
        this.$inner.className = "modal__inner";

        this.$wrap.appendChild(this.$inner);
        $target.appendChild(this.$wrap);
    }

    open() {
        this.$wrap.style.display = "flex";
    }

    close() {
        this.$wrap.style.display = "none";
    }
}
