export default class Form {
    $target = null;
    $wrap = null;
    $input = null;
    onCreate = null;

    constructor({ $target, onCreate }) {
        this.$target = $target;
        this.onCreate = onCreate;
    }

    dom(document) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "form";

        this.$input = document.createElement("input");
        this.$input.className = "form__input";
        this.$input.placeholder = "해야할 일을 입력해주세요.";

        this.$wrap.appendChild(this.$input);
        this.$target.appendChild(this.$wrap);

        return this;
    }

    event() {
        this.$input.addEventListener("keyup", (e) => {
            const { target } = e;
            const { value } = target;

            if (!value.length) return;
            if (e.key === "Enter") {
                this.$input.value = "";
                this.onCreate(value);
            }
        });

        this.$input.addEventListener("click", () => (this.$input.value = ""));

        return this;
    }
}
