import { JSDOM } from "jsdom";
import Modal from "../../src/js/components/Modal";
import Dimmed from "../../src/js/components/Dimmed";
import { getHtml, getIndex, getDisplay } from "../helpers/dom";

const html = getIndex();

describe("components/Dimmed", () => {
	let dom, document, body, modal, dimmed, $app;

	beforeEach(() => {
		dom = new JSDOM(html, { runScripts: "dangerously" });
		document = dom.window.document;
		body = document.body;

		$app = body.querySelector("#app");

		modal = new Modal({ $target: $app }).dom(document);
		dimmed = new Dimmed({ $target: modal.$wrap, modal })
			.dom(document);
	});

	afterEach(() => {
		dom = document = body = $app = modal = dimmed = null;
	});

	it("Dimmed/close", () => {
		dimmed
			.event();

		expect(getDisplay($app.querySelector(".modal"))).toBe("");

		dimmed.$dimmed.click();

		expect(getDisplay($app.querySelector(".modal"))).toBe("none");
	});
});
