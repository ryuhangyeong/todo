export const createTodo = (id, title) => ({ id, title, completed: 0 });
export const getTodos = [
	createTodo(1, "자바스크립트 공부하기"),
	createTodo(2, "HTML5 공부하기"),
	createTodo(3, "CSS3 공부하기")
];