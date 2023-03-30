import path from "path";
import fs from "fs";
import { marked } from "marked";

/**
 * Converts the content of the markdown files to corresponding HTML
 */
export const getMarkdownAndConvertToHtml = (fileName: string): string => {
	const filePath = path.resolve(__dirname, "../views/content", fileName);
	return marked.parse(fs.readFileSync(filePath).toString());
};
