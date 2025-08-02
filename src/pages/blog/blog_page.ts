import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("plat-blog-page")
export class PlatBlogElement extends LitElement {
 protected render(): HTMLTemplateResult {
	return html`
		<h1>blog</h1>
	`;
 }
}