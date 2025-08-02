import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "urlpattern-polyfill";
import "./index/index_page";
import "./blog/blog_page";

@customElement("plat-router")
export class PlatRouterElement extends LitElement {
	
	private router: Router;

	constructor() {
		super();
		this.router = new Router(this, [
			{path: "/", render: () => html`<h1>Home</h1>`},
			{path: "/blog", render: () => html`<h1>Blog</h1>`}
		]);
	}

	protected render(): HTMLTemplateResult {
		return html`
			${this.router.outlet()}
		`;
	}
}