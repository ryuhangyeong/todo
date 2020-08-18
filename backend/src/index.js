import path from "path";
import dotenv from "dotenv";
import express from "express";
import validate from "./validate";
import db from "./db";

dotenv.config();

const app = express();
const { PORT } = process.env;
const API_ENDPOINT = "/api/todo";

app.set("view engine", "html");
app.set("views", __dirname + "/dist");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (_, res) => res.render("index"));

app.route(API_ENDPOINT)
    .get(async (req, res) => {
        try {
            const [data] = await db(
                "SELECT id, title, completed from list where deleteFlag = 0 order by id desc"
            );
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    })
    .post(async (req, res) => {
        const { title } = req.body;

        try {
            validate(
                {
                    title: {
                        type: String,
                        required: true,
                        length: { min: 1, max: 255 },
                    },
                },
                req.body
            );

            const [data] = await db("INSERT INTO list(title) VALUES (?)", [
                title,
            ]);
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    });

app.route(`${API_ENDPOINT}/:id`)
    .put(async (req, res) => {
        const { id } = req.params;

        try {
            const [data] = await db("SELECT completed from list WHERE id = ?", [
                id,
            ]);

            const [
                updateData,
            ] = await db("UPDATE list SET completed = ? WHERE id = ?", [
                !data[0].completed,
                id,
            ]);

            res.status(200).json(updateData);
        } catch (e) {
            res.status(400).json(e);
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;

        try {
            const [
                data,
            ] = await db("UPDATE list SET deleteFlag = 1 WHERE id = ?", [id]);

            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    });

app.listen(PORT, () => console.log(`Todo App Running PORT: ${PORT}`));
