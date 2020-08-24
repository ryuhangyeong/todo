import * as fs from "fs";
import path from "path";

export const getHtml = (dom) => dom.outerHTML;
export const getIndex = () => fs.readFileSync(path.resolve(__dirname, "../../src/html/index.html"), "utf-8");
export const getDisplay = (dom) => dom.style.display; 