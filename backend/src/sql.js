import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const { DB, DB_HOST, DB_USER, DB_PASS } = process.env;

const pool = mysql.createPool({
    database: DB,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    connectionLimit: 50,
});

export default async (sql, params = []) => {
    try {
        const connection = await pool.getConnection(async (_) => _);
        const data = await connection.query(sql, params);
        connection.release();

        return data;
    } catch (e) {
        throw e;
    }
};
