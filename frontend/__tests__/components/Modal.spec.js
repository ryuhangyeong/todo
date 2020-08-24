import { JSDOM } from "jsdom";
import Modal from "../../src/js/components/Modal";
import { getHtml, getIndex, getDisplay } from "../helpers/dom";

const html = getIndex();

describe("components/Modal", () => {
	let dom, document, body, modal, $app;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		document = dom.window.document;
		body = document.body;

		$app = body.querySelector("#app");

		modal = new Modal({ $target: $app })
			.dom(document);
	});

	afterEach(() => {
		dom = document = body = $app = modal = null;
	});

	it("Modal/open", () => {
		modal
			.open();

		expect(getDisplay($app.querySelector(".modal"))).toBe("flex");
	});

	it("Modal/close", () => {
		modal
			.close();

		expect(getDisplay($app.querySelector(".modal"))).toBe("none");
	});
});
