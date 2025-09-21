import { Routes } from "@lit-labs/router";
import { html, LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./list/blog_list_page";
import "./blog_view";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("plat-blog-page")
export class PlatBlogElement extends LitElement {

	private routes: Routes;

	constructor() {
		super();
		this.routes = new Routes(this, [
			{path: "list/", render: () => html`<plat-blog-list></plat-blog-list>`},
			{path: "view/:id", render: ({id}) => html`<plat-blog-view pageId=${ifDefined(id)}></plat-blog-view>`}
		]);
	}

	protected render(): TemplateResult {
		return html`
			<div>
				${this.routes.outlet()}
			</div>
		`;
	}
}