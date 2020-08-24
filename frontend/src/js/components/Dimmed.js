export default class Dimmed {
    $target = null;
    $dimmed = null;
    modal = null;

    constructor({ $target, modal }) {
        this.$target = $target;
        this.modal = modal;
    }

    dom(document) {
        this.$dimmed = document.createElement("section");
        this.$dimmed.className = "dimmed";
        this.$target.appendChild(this.$dimmed);

        return this;
    }

    event() {
        this.$dimmed.addEventListener("click", () => this.modal.close());

        return this;
    }
}
