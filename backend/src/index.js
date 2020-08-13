import path from "path";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const { PORT, DB, DB_HOST, DB_USER, DB_PASS } = process.env;
const API_ENDPOINT = "/api/todo";

app.set("view engine", "html");
app.set("views", __dirname + "/dist");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

const pool = mysql.createPool({
    database: DB,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    connectionLimit: 50,
});

app.get("/", (_, res) => res.render("index"));

app.route(API_ENDPOINT)
    .get(async (req, res) => {
        try {
            const connection = await pool.getConnection(async (_) => _);
            const [data] = await connection.query(
                "SELECT id, title, completed from list where deleteFlag = 0 order by id desc"
            );
            connection.release();
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    })
    .post(async (req, res) => {
        const { title } = req.body;

        try {
            const connection = await pool.getConnection(async (_) => _);
            const [
                data,
            ] = await connection.query("INSERT INTO list(title) VALUES (?)", [
                title,
            ]);
            connection.release();
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    });

app.put(`${API_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection(async (_) => _);

        const [
            data,
        ] = await connection.query("SELECT completed from list WHERE id = ?", [
            id,
        ]);

        const [
            updateData,
        ] = await connection.query(
            "UPDATE list SET completed = ? WHERE id = ?",
            [data[0].completed ? 0 : 1, id]
        );

        connection.release();
        res.status(200).json(updateData);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.delete(`${API_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection(async (_) => _);

        const [
            data,
        ] = await connection.query(
            "UPDATE list SET deleteFlag = 1 WHERE id = ?",
            [id]
        );

        connection.release();
        res.status(200).json(data);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.listen(PORT, () => console.log(`Todo App Running PORT: ${PORT}`));
