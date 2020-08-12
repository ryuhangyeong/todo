import express from "express";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const { PORT, DB, DB_HOST, DB_USER, DB_PASS } = process.env;

let pool = mysql.createPool({
    database: DB,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', "html");
app.set("views", __dirname + "/dist");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => res.render("index"));
app.listen(PORT, () => console.log(`Todo App Running PORT: ${PORT}`));
