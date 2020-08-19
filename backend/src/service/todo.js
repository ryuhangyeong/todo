import {
    selectList,
    selectListById,
    insert,
    updateCompletedById,
    updateDeleteFlagById,
} from "../dao/todo";

export const getList = async () => {
    const data = await selectList();

    return data;
};

export const getListById = async (id) => {
    const data = await selectListById(id);

    return data;
};

export const create = async (title) => {
    const data = await insert(title);

    return data;
};

export const modifyCompletedById = async (todo, id) => {
    const data = await updateCompletedById(todo, id);

    return data;
};

export const modifyDeleteFlagById = async (id) => {
    const data = await updateDeleteFlagById(id);

    return data;
};
