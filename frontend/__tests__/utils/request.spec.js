import { request, API_ENDPOINT } from "../../src/js/utils/request";
import { getTodos } from "../helpers/todo";

describe("utils/request", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	describe("request/GET", () => {
		it.only("GET/success", async (done) => {
			fetch.mockResponse(JSON.stringify(getTodos()));

			const data = await request({ url: API_ENDPOINT, opts: {} });

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(data).toEqual(getTodos());

			done();
		});

		it.skip("GET/failure", async (done) => {

		});
	});
});