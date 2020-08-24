import { JSDOM } from "jsdom";
import Form from "../../src/js/components/Form";
import { getHtml, getIndex } from "../helpers/dom";
import { getDummyText } from "../helpers/todo";

const html = getIndex();

describe("components/Form", () => {
	let dom, window, document, body, form, $app, mockFn;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		window = dom.window;
		document = window.document;
		body = document.body;

		$app = body.querySelector("#app");
		mockFn = jest.fn();

		form = new Form({ $target: $app, onCreate: mockFn })
			.dom(document);
	});

	afterEach(() => {
		dom = window = document = body = $app = form = null;
	});


	it("Form/event/value", () => {
		form.$input.setAttribute("value", getDummyText());

		expect($app.querySelector(".form__input").value).toBe(form.$input.value);
	});

	it("Form/event/keyup/Enter", () => {
		form
			.event();

		form.$input.setAttribute("value", "");
		form.$input.dispatchEvent(new window.KeyboardEvent("keyup", {
			key: "Enter"
		}));

		expect(mockFn).toBeCalledTimes(0);

		form.$input.setAttribute("value", getDummyText());
		form.$input.dispatchEvent(new window.KeyboardEvent("keyup", {
			key: "Enter"
		}));

		expect(mockFn).toBeCalledTimes(1);
		expect(form.$input.value).toBe("");
	});

	it("Form/event/click", () => {
		form
			.event();

		form.$input.setAttribute("value", getDummyText());

		expect(form.$input.value).not.toBe("");

		form.$input.click();

		expect(form.$input.value).toBe("");
	});
});
