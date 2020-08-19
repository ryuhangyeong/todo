import {
    selectList,
    selectListById,
    insert,
    updateCompletedById,
    updateDeleteFlagById,
} from "../dao/todo";

export const getList = async () => {
    try {
        const data = await selectList();

        return data;
    } catch (e) {
        throw e;
    }
};

export const getListById = async (id) => {
    try {
        const data = await selectListById(id);

        return data;
    } catch (e) {
        throw e;
    }
};

export const create = async (title) => {
    try {
        const data = await insert(title);

        return data;
    } catch (e) {
        throw e;
    }
};

export const modifyCompletedById = async (todo, id) => {
    try {
        const data = await updateCompletedById(todo, id);

        return data;
    } catch (e) {
        throw e;
    }
};

export const modifyDeleteFlagById = async (id) => {
    try {
        const data = await updateDeleteFlagById(id);

        return data;
    } catch (e) {
        throw e;
    }
};
