import path from "path";
import fs from "fs";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const renderer = new marked.Renderer();

/**
 * Converting the two types of links in the markdown files
 * 1. External URLs containing `http` or `https`
 * 2. Internal URLs containing the Connect module keys
 *    (Connect page navigation is handled in `static/js/index.js`)
 */
renderer.link = (href: string, _, text: string): string => {
	if (href?.includes("https" || href?.includes("http"))) {
		return `<a target="_blank" href="${href}">${text}</a>`;
	} else {
		const page = href?.substring(1);
		return `<span class="link-span" id="${page}" data-connect-module-key="${page}">${text}</span>`;
	}
};

/**
 * Converts the content of the markdown files to corresponding HTML
 */
export const getMarkdownAndConvertToHtml = (fileName: string): string => {
	const filePath = path.resolve(__dirname, "../views/content", fileName);
	const contents = fs.readFileSync(filePath);
	// TODO - see if there's a way to modify the way we are using marked.js so we can pass data directly to HTML elements
	const markdownToHtml = marked.parse(contents.toString(), { renderer });

	return sanitizeHtml(markdownToHtml, {
		allowedAttributes: {
			span: [ "class", "id", "data-connect-module-key" ],
			a: [ "href", "target", "data-connect-module-key" ]
		}
	});
};
