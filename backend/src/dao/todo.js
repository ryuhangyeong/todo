import sql from "../sql";

export const selectList = async () =>
    await sql(
        "SELECT id, title, completed from list where deleteFlag = 0 order by id desc"
    );

export const selectListById = async (id) =>
    await sql("SELECT completed from list WHERE id = ?", [id]);

export const insert = async (title) =>
    await sql("INSERT INTO list(title) VALUES (?)", [title]);

export const updateCompletedById = async (completed, id) =>
    await sql("UPDATE list SET completed = ? WHERE id = ?", [!completed, id]);
export const updateDeleteFlagById = async (id) =>
    await sql("UPDATE list SET deleteFlag = 1 WHERE id = ?", [id]);
