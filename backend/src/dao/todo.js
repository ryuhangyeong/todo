import sql from "../sql";

export const selectList = async () => {
    const data = await sql(
        "sSELECT id, title, completed from list where deleteFlag = 0 order by id desc"
    );

    return data;
};

export const selectListById = async (id) => {
    const data = await sql("SELECT completed from list WHERE id = ?", [id]);

    return data;
};

export const insert = async (title) => {
    const data = await sql("INSERT INTO list(title) VALUES (?)", [title]);

    return data;
};

export const updateCompletedById = async (todo, id) => {
    const data = await sql("UPDATE list SET completed = ? WHERE id = ?", [
        !todo[0].completed,
        id,
    ]);

    return data;
};

export const updateDeleteFlagById = async (id) => {
    const data = await sql("UPDATE list SET deleteFlag = 1 WHERE id = ?", [id]);

    return data;
};
