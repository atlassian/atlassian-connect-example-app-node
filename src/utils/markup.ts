import path from "path";
import fs from "fs";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.link = (href: string, _, text: string): string => {
	if (href?.includes("https" || href?.includes("http"))) {
		return `<a target="_blank" href="${href}">${text}</a>`;
	} else {
		const page = href?.substring(1);
		return `<span class="link-span" id="${page}" data-connect-module-key="${page}">${text}</span>`;
	}
};
const getMarkdownAndConvertToHtml = (fileName: string): string => {
	const filePath = path.join(__dirname, "..", "content", fileName);
	const contents = fs.readFileSync(filePath);
	// TODO - see if there's a way to modify the way we are using marked.js so we can pass data directly to HTML elements
	const markdownToHtml = marked.parse(contents.toString(), { renderer: renderer });

	return sanitizeHtml(markdownToHtml, {
		allowedAttributes: {
			span: [ "class", "id", "data-connect-module-key" ],
			a: [ "href", "target" ]
		}
	});
};


export default getMarkdownAndConvertToHtml;
