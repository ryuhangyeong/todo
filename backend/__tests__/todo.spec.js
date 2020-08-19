import request from "supertest";
import app from "../src/index";
import * as todoDao from "../src/dao/todo";
import { getList, getListById } from "../src/service/todo";

/*
	좋은 테스트 코드 작성을 위해 고민중에 있습니다.
 */
jest.mock("../src/dao/todo");

const API_ENDPOINT = "/api/todo";

let selectList = todoDao.selectList;
let selectListById = todoDao.selectListById;

beforeEach(() => {
    selectList.mockClear();
    selectListById.mockClear();
});

test.skip("리스트 조회", async (done) => {
    const res = await request(app).get(API_ENDPOINT).expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
});

test.skip("getList", async (done) => {
    await getList();
    expect(selectList).toBeCalledTimes(1);

    done();
});

test.skip("getListById", async (done) => {
    await getListById(1);

    expect(selectListById).toBeCalledTimes(1);
    expect(selectListById).toBeCalledWith(1);

    done();
});

test.skip("getListById", async (done) => {
    selectListById.mockResolvedValue([]);

    const data = await getListById(1);

    expect(data).toEqual([]);

    done();
});

test.skip("추가 - 비어있는 title", async (done) => {
    const res = await request(app).post(API_ENDPOINT).send({}).expect(400);
    expect(res.body.path).toBe("title");
    done();
});

test.skip("추가 - 너무 긴 title", async (done) => {
    const res = await request(app)
        .post(API_ENDPOINT)
        .send({
            title: "wrong string".repeat(255),
        })
        .expect(400);
    expect(res.body.path).toBe("title");
    done();
});
