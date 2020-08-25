import { request, API_ENDPOINT } from "../../src/js/utils/request";
import { getTodos } from "../helpers/todo";
import { 
	ERROR_STATUS, 
	ERROR_RES
} from "../helpers/constant";

/*
 * @description Ajax Test에 대해서 더 고민해보자.
 */
describe.skip(`utils/request - ${API_ENDPOINT}`, () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	describe("request/GET", () => {
		it("GET/success", async () => {
			fetch.mockResponse(JSON.stringify(getTodos()));

			const data = await request({ url: API_ENDPOINT, opts: {} });

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(data).toEqual(getTodos());
		});

		it("GET/failure", async () => {
			fetch.mockReject(ERROR_RES);

			try {
			    await request({ url: API_ENDPOINT, opts: {} });
		  	} catch (e) {
		    	expect(e.status).toEqual(ERROR_STATUS);
		  	}
		});
	});
});