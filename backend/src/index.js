import path from "path";
import dotenv from "dotenv";
import express from "express";
import validate from "./validate";
import sql from "./sql";
import * as todoService from "./service/todo";

dotenv.config();

const app = express();
const { NODE_ENV, PORT } = process.env;
const API_ENDPOINT = "/api/todo";

app.set("view engine", "html");
app.set("views", __dirname + "/dist");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (_, res) => res.render("index"));

app.route(API_ENDPOINT)
    .get(async (_, res) => {
        try {
            const [data] = await todoService.getList();

            res.status(200).json(data);
        } catch (e) {
            console.log("444");
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

            const [data] = await todoService.create(title);
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    });

app.route(`${API_ENDPOINT}/:id`)
    .put(async (req, res) => {
        const { id } = req.params;

        try {
            const [data] = await todoService.getListById(id);

            const [updateData] = await todoService.modifyCompletedById(
                data,
                id
            );

            res.status(200).json(updateData);
        } catch (e) {
            res.status(400).json(e);
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;

        try {
            const [data] = await todoService.modifyDeleteFlagById(id);

            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    });

if (NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`Todo App Running PORT: ${PORT}`));
}

export default app;
