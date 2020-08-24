import "whatwg-fetch";
import App from "./App";
import "../scss/index.scss";

window.addEventListener(
    "DOMContentLoaded",
    () => new App(document.getElementById("app"))
);
