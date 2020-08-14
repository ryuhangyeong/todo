export default class Dimmed {
    $dimmed = null;
    modal = null;

    constructor({ $target, modal }) {
        this.$dimmed = document.createElement("section");
        this.$dimmed.className = "dimmed";

        $target.appendChild(this.$dimmed);

        this.modal = modal;
        this.event();
    }

    event() {
        this.$dimmed.addEventListener("click", () => this.modal.close());
    }
}
