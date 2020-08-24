export default class Statistics {
    $target = null;
    $wrap = null;
    $statistics = null;
    $document = null;

    data = null;

    constructor({ $target, initialData }) {
        this.$target = $target;
        this.data = initialData;
    }

    dom(document) {
        this.$document = document;

        this.$wrap = this.$document.createElement("section");
        this.$wrap.className = "wrap";

        this.$statistics = this.$document.createElement("ul");
        this.$statistics.className = "statistics";

        this.$wrap.appendChild(this.$statistics);
        this.$target.appendChild(this.$wrap);

        return this;
    }

    setState(nextData) {
        this.data = nextData;
        this.render();

        return this;
    }

    render() {
        if (!this.data.length) return;

        this.$statistics.innerHTML = this.data
            .map(
                (s) => `
        	<li class="statistics__item">
				<a href="#${s.label}" class="statistics__link" data-label="${s.label}">
					<strong>${s.length}</strong>
					<p>${s.label}</p>
				</a>
			</li>
        `
            )
            .join("");

        return this;
    }

    active(hash) {
        for (const item of this.$document.querySelectorAll(".statistics__item"))
            item.className = "statistics__item";
        this.$document.querySelector(
            `[data-label="${hash}"]`
        ).parentNode.className += " statistics__item--active";

        return this;
    }
}
