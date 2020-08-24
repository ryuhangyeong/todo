import { JSDOM } from "jsdom";
import Statistics from "../../src/js/components/Statistics";
import stat from "../../src/js/utils/statistics";
import { getHtml, getIndex } from "../helpers/dom";
import { getTodos } from "../helpers/todo";

const html = getIndex();

describe("components/Statistics", () => {
	let dom, document, body, statistics, $app;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		document = dom.window.document;
		body = document.body;

		$app = body.querySelector("#app");

		statistics = new Statistics({ $target: $app, initialData: stat(getTodos()) })
			.dom(document);
	});

	afterEach(() => {
		dom = document = body = $app = statistics = null;
	});

	it("Statistics/render", () => {
		statistics
			.render();

		expect($app.querySelector(".statistics").innerHTML).not.toBe("");
	});

	it("Statistics/setState", () => {
		const todos = getTodos();

		todos[0].completed = 1;

		statistics
			.setState(stat(todos));

		expect(+$app.querySelectorAll(".statistics__link strong")[2].innerHTML).toBe(1);
	});

	it("Statistics/active", () => {
		statistics
			.render()
			.active("All");

		expect($app.querySelectorAll(".statistics__item")[0].classList.contains("statistics__item--active")).toBe(true);
	
		statistics
			.active("Active");

		expect($app.querySelectorAll(".statistics__item")[1].classList.contains("statistics__item--active")).toBe(true);
	});
});
