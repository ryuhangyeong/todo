import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");
app.set("views", __dirname + "/dist");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => res.render("index"));
app.listen(PORT, () => console.log(`Todo App Running PORT: ${PORT}`));
