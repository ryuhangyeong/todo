import { JSDOM } from "jsdom";
import Statistics from "../../src/js/components/Statistics";
import Todo from "../../src/js/components/Todo";
import TodoModel from "../../src/js/models/todo";
import { getIndex, getHtml, getDisplay } from "../helpers/dom";
import { getTodos } from "../helpers/todo";
import stat from "../../src/js/utils/statistics";

const html = getIndex();

describe("components/Todo", () => {
	let dom, window, document, body, todo, statistics, todoModel, $app;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		window = dom.window;
		document = window.document;
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
		dom = window = document = body = $app = todoModel = statistics = todo = null;
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

	describe("Todo/delete", () => {
		it("deleteItem", async () => {
			todo
				.render();
			
			await todo.deleteItem($app.querySelectorAll(".todo__delete")[0]);

			expect($app.querySelector("[data-id='1']")).toBe(null);
		});

		it("delete", async () => {
			fetch.mockResponse(JSON.stringify({
				changedRows: 1
			}));

			todo
				.render();

			await todo.delete(1, $app.querySelectorAll(".todo__delete")[0]);

			expect(fetch).toHaveBeenCalledTimes(1);
			expect($app.querySelector("[data-id='1']")).toBe(null);
			expect(todo.todo.getList().findIndex((t) => t.id === 1)).toBe(-1);
			expect(todo.statistics.data[0].length).toBe(2);
		});
	});

	it("Todo/toggle", async () => {
		fetch.mockResponse(JSON.stringify({
			changedRows: 1
		}));

		todo
			.render();

		await todo.toggle(1);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(todo.todo.getList()[0].completed).toBe(1);
		expect(todo.statistics.data[2].length).toBe(1);
	});

	describe("Todo/event", () => {
		it("event/delete", () => {
			fetch.mockResponse(JSON.stringify({
				changedRows: 1
			}));

			todo
				.render()
				.event();

			$app.querySelectorAll(".todo__delete")[0].click();

			expect(fetch).toHaveBeenCalledTimes(1);
		});

		it("event/toggle", () => {
			todo
				.render()
				.event();

			$app.querySelectorAll(".todo__label")[0].click();

			expect(fetch).toHaveBeenCalledTimes(1);
		});

		/*
		 * @description 동적 import 하는 코드에서는 어떻게 테스트 코드를 작성할 수 있을까?
		 * mock 으로 처리를 해야할까?
		 */
		it.skip("event/modal", () => {
			todo
				.render()
				.event();
		});
	});
});
