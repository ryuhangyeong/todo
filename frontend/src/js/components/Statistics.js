export default class Statistics {
    $wrap = null;
    $statistics = null;
    data = null;

    constructor({ $target, initialData }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "wrap";

        this.$statistics = document.createElement("ul");
        this.$statistics.className = "statistics";

        this.$wrap.appendChild(this.$statistics);
        $target.appendChild(this.$wrap);

        this.data = initialData;

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        if (!this.data.length) return;

        this.$statistics.innerHTML = this.data
            .map(
                (s) => `
        	<li class="statistics__item">
				<a href="#${s.label}" class="statistics__link" data-label="${s.label}">
					<strong>${s.count}</strong>
					<p>${s.label}</p>
				</a>
			</li>
        `
            )
            .join("");
    }

    active(hash) {
        for (const item of document.querySelectorAll(".statistics__item"))
            item.className = "statistics__item";
        document.querySelector(`[data-label="${hash}"]`).parentNode.className +=
            " statistics__item--active";
    }
}
