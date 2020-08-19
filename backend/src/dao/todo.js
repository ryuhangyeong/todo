import sql from "../sql";

export const selectList = async () => {
    try {
        const data = await sql(
            "SELECT id, title, completed from list where deleteFlag = 0 order by id desc"
        );

        return data;
    } catch (e) {
        throw e;
    }
};

export const selectListById = async (id) => {
    try {
        const data = await sql("SELECT completed from list WHERE id = ?", [id]);

        return data;
    } catch (e) {
        throw e;
    }
};

export const insert = async (title) => {
    try {
        const data = await sql("INSERT INTO list(title) VALUES (?)", [title]);

        return data;
    } catch (e) {
        throw e;
    }
};

export const updateCompletedById = async (todo, id) => {
    try {
        const data = await sql("UPDATE list SET completed = ? WHERE id = ?", [
            !todo[0].completed,
            id,
        ]);

        return data;
    } catch (e) {
        throw e;
    }
};

export const updateDeleteFlagById = async (id) => {
    try {
        const data = await sql("UPDATE list SET deleteFlag = 1 WHERE id = ?", [
            id,
        ]);

        return data;
    } catch (e) {
        throw e;
    }
};
