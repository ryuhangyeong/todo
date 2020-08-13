export default class Form {
    $wrap = null;
    $input = null;
    onCreate = null;

    constructor({ $target, onCreate }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "form";

        this.$input = document.createElement("input");
        this.$input.className = "form__input";
        this.$input.autofocus = true;
        this.$input.placeholder = "해야할 일을 입력해주세요.";

        this.$wrap.appendChild(this.$input);
        $target.appendChild(this.$wrap);

        this.onCreate = onCreate;

        this.init();
    }

    init() {
        this.$input.addEventListener("keyup", (e) => {
            const { value } = e.target;

            if (!value.length) return;
            if (e.key === "Enter") this.onCreate(value);
        });
    }
}
