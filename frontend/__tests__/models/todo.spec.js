import TodoModel from "../../src/js/models/todo";
import { createTodo, getTodos, getDummyText } from "../helpers/todo";

describe("models/todo", () => {
	let todo, len;

	const id = 4,
		NOT_FOUND = -1;

	beforeEach(() => {
		todo = new TodoModel();

		todo.init(getTodos());

		len = todo.size();
	});

	afterEach(() => todo.clear());

	it("추가", () => {
		todo.create(createTodo(id, getDummyText()));
		expect(todo.size()).toBe(len + 1);
	});

	it("검색", () => {
		let idx = todo.getIdxById(id);

		expect(idx).toBe(NOT_FOUND);

		todo.create(createTodo(id, getDummyText()));

		idx = todo.getIdxById(id);

		expect(idx).not.toBe(NOT_FOUND);
	});

	it("삭제", () => {
		todo.destory(NOT_FOUND);

		expect(todo.size()).toBe(len);

		todo.destory(1);

		expect(todo.size()).toBe(len - 1);
	});

	it("완료", () => {
		const T = 1,
			idx = todo.getIdxById(T);

		expect(todo.list[idx].completed).toBe(0);

		todo.updateCompleted(T);

		expect(todo.list[idx].completed).toBe(1);
	});

	it("초기화", () => {
		expect(todo.size()).toBe(len);

		todo.clear();

		expect(todo.size()).toBe(0);
	});
});
