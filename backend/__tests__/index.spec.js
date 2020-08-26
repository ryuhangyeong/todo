import request from "supertest";
import app from "../src/index";

const API_ENDPOINT = "/api/todo";

/*
    @description 좋은 테스트 코드 작성을 위해 고민중에 있습니다.
    @notice .env 및 mysql 등의 의존성 때문에 테스트가 깨진다.
    @todo 이 부분을 mock으로 대체해야한다.
 */
describe.skip(`${API_ENDPOINT}`, () => {
    it("GET/", async (done) => {
        const res = await request(app)
            .get(API_ENDPOINT)
            .expect(200);

        expect(Array.isArray(res.body)).toBeTruthy();
        done();
    });

    describe("POST/", () => {
        it("Required title", async (done) => {
            const res = await request(app)
                .post(API_ENDPOINT)
                .expect(400)
                .send({});

            expect(res.body.path).toBe("title");
            done();
        });

        it("Awrong title", async (done) => {
            const res = await request(app)
                .post(API_ENDPOINT)
                .expect(400)
                .send({
                    title: "wrong string".repeat(255),
                });

            expect(res.body.path).toBe("title");
            done();
        });
    });
});
