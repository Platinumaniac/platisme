
import { LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, unsafeStatic } from "lit/static-html.js";


@customElement("plat-blog-view")
export class PlatBlogViewElement extends LitElement {

	@property({type: String})
	pageId: string;

	constructor() {
		super();
		this.pageId = "";
	}
	firstUpdated(): void {
		import(`./entries/${this.pageId}/entry`);
	}

	protected render(): TemplateResult {
		let tagName = `plat-${this.pageId}-entry`;
		return html`
			<${unsafeStatic(tagName)}>
			</${unsafeStatic(tagName)}>
		`;
	}
}