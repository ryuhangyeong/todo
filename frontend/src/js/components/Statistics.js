export default class Statistics {
    $wrap = null;
    $statistics = null;
    data = null;

    constructor({ $target, initialData, onMode }) {
        this.$wrap = document.createElement("section");
        this.$wrap.className = "wrap";

        this.$statistics = document.createElement("ul");
        this.$statistics.className = "statistics";

        this.$wrap.appendChild(this.$statistics);
        $target.appendChild(this.$wrap);

        this.data = initialData;
        this.onMode = onMode;

        this.render();
        this.event();
    }

    event() {
        this.$statistics.addEventListener("click", (e) => {
            this.onMode(e.target.closest(".statistics__link").dataset.label);
        });
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
				<a href="#" class="statistics__link" data-label="${s.label}">
					<strong>${s.count}</strong>
					<p>${s.label}</p>
				</a>
			</li>
        `
            )
            .join("");
    }
}
