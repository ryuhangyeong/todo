import {
    selectList,
    selectListById,
    insert,
    updateCompletedById,
    updateDeleteFlagById,
} from "../dao/todo";

export const getList = async () => await selectList();
export const getListById = async (id) => await selectListById(id);
export const create = async (title) => await insert(title);
export const modifyCompletedById = async (completed, id) =>
    await updateCompletedById(completed, id);
export const modifyDeleteFlagById = async (id) =>
    await updateDeleteFlagById(id);
