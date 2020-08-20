import statistics from "../../src/js/utils/statistics";
import TodoModel from "../../src/js/models/todo";
import { getTodos } from "../helpers";

describe("utils/statisticss", () => {
	let todo;

	beforeEach(() => {
		todo = new TodoModel();
		todo.init(getTodos);
	});

	afterEach(() => {
		todo.clear();
	});

	it.skip("All", () => {
		expect(statistics(todo.getList())[0]).toHaveLength(getTodos.length);
	});

	it.skip("Active", () => {
		todo.updateCompleted(1);
		expect(statistics(todo.getList())[1]).toHaveLength(getTodos.length - 1);
	});

	it.skip("Completed", () => {
		todo.updateCompleted(1);
		expect(statistics(todo.getList())[2].length).toBe(1);
	});
});