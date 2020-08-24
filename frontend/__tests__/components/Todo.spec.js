import { JSDOM } from "jsdom";
import Statistics from "../../src/js/components/Statistics";
import Todo from "../../src/js/components/Todo";
import TodoModel from "../../src/js/models/todo";
import { getIndex, getHtml, getDisplay } from "../helpers/dom";
import { getTodos } from "../helpers/todo";
import stat from "../../src/js/utils/statistics";

const html = getIndex();

describe("components/Todo", () => {
	let dom, document, body, todo, statistics, todoModel, $app;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		document = dom.window.document;
		body = document.body;

		$app = body.querySelector("#app");

		todoModel = new TodoModel();

		todoModel.init(getTodos());

		statistics = new Statistics({
			$target: $app,
			initialData: stat(todoModel.list)
		}).dom(document);

		todo = new Todo({ 
			$target: $app,
			initialData: {
                todo: todoModel,
            },
            statistics
		}).dom(document);
	});

	afterEach(() => {
		dom = document = body = $app = todoModel = statistics = todo = null;
	});

	it("Todo/render", () => {
		todo
			.render();

		expect($app.querySelector(".todo ul").innerHTML).not.toBe("");

		todo.todo.list[0].completed = 1;

		todo
			.render();

		expect($app.querySelectorAll(".todo__completed")[0].checked).toBe(true);
		expect($app.querySelectorAll(".todo__completed")[1].checked).toBe(false);
	});

	it("Todo/_hide", () => {
		todo.
			render()
			._hide(1);

		expect(getDisplay($app.querySelectorAll(".todo__item")[0])).toBe("none");
	});

	describe("Todo/filter", () => {
		beforeEach(() => {
			todo.todo.list[0].completed = 1;
		});

		it("All", () => {
			todo
				.render()
				.filter("All");

			for (const item of $app.querySelectorAll(".todo__item")) 
				expect(getDisplay(item)).toBe("flex");
		});

		it("Active", () => {
			todo
				.render()
				.filter("Active");

			const list = $app.querySelectorAll(".todo__item");

			["none", "flex", "flex"].forEach((d, i) => {
				expect(getDisplay(list[i])).toBe(d);
			});
		});

		it("Completed", () => {
			todo
				.render()
				.filter("Completed");

			const list = $app.querySelectorAll(".todo__item");

			["flex", "none", "none"].forEach((d, i) => {
				expect(getDisplay(list[i])).toBe(d);
			});
		});
	});

	describe.skip("Todo/delete", () => {

	});

	it.skip("Todo/toggle", () => {

	});
});
