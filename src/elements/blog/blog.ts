import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Routes } from "@lit-labs/router";
import "urlpattern-polyfill";

@customElement("plat-blog-page")
export class BlogRouter extends LitElement {

	routes: Routes;

	constructor() {
		super();
		
		this.routes = new Routes(this, [
			{path: "list", render: () => html`<h1>List</h1>`}
		])
	}

	protected render(): HTMLTemplateResult {
		return html`
		<div>
			${this.routes.outlet()}
		</div>`
	}
}