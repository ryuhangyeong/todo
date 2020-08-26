import * as todoDao from "../../src/dao/todo";
import {
    getList,
    getListById,
    create,
    modifyCompletedById,
    modifyDeleteFlagById,
} from "../../src/service/todo";

jest.mock("../../src/dao/todo");

let {
    selectList,
    selectListById,
    insert,
    updateCompletedById,
    updateDeleteFlagById,
} = todoDao;

/*
	좋은 테스트 코드 작성을 위해 고민중에 있습니다.
 */
describe("service/todo", () => {
    beforeEach(() => {
        selectList.mockClear();
        selectListById.mockClear();
    });

    it.only("getList", async (done) => {
        await getList();
        console.log(selectList);
        expect(selectList).toBeCalledTimes(1);

        done();
    });

    it("getListById", async (done) => {
        await getListById(1);

        expect(selectListById).toBeCalledTimes(1);
        expect(selectListById).toBeCalledWith(1);

        done();
    });

    it("create", async (done) => {
        await create("Reactjs 공부하기");

        expect(insert).toBeCalledTimes(1);
        expect(insert).toBeCalledWith("Reactjs 공부하기");

        done();
    });

    it("modifyCompletedById", async (done) => {
        await modifyCompletedById(false, 1);

        expect(updateCompletedById).toBeCalledTimes(1);
        expect(updateCompletedById).toBeCalledWith(false, 1);

        done();
    });

    it("modifyDeleteFlagById", async (done) => {
        await modifyDeleteFlagById(1);

        expect(updateDeleteFlagById).toBeCalledTimes(1);
        expect(updateDeleteFlagById).toBeCalledWith(1);

        done();
    });
});
