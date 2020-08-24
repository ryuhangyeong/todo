import { JSDOM } from "jsdom";
import Statistics from "../../src/js/components/Statistics";
import Todo from "../../src/js/components/Todo";
import TodoModel from "../../src/js/models/todo";
import { getIndex } from "../helpers/dom";
import { getTodos } from "../helpers/todo";

const html = getIndex();

describe("components/Todo", () => {
	let dom, document, body, todo, $app;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		document = dom.window.document;
		body = document.body;

		$app = body.querySelector("#app");

		todo = new Todo({ 
			$target: $app,
			initialData: {
                todo: this.state.todo,
            },
            statistics: statistics()
		}).dom(document);
	});

	afterEach(() => {
		dom = document = body = $app = todo = null;
	});

	it.skip("Todo/render", () => {

	});
});
