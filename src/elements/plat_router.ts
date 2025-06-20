import { Router } from "@lit-labs/router";

import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "urlpattern-polyfill";

import "./index/index_page.ts";
import "./blog/blog.ts";

//const entry: Object = await import("./blog/entries/test/entry.ts")

//console.log(entry)

@customElement("plat-router")
export class PlatRouter extends LitElement {
	private router = new Router(this, [
		{path: "/", render: () => html`<plat-index-page></plat-index-page>`},
		{path: "/blog/", render: () => html`<plat-blog-page></plat-blog-page>`},
		{path: "/blog/*", render: () => html`<plat-blog-page></plat-blog-page>`}
  	]);

	render(): HTMLTemplateResult {
		return html`
			<div>
				${this.router.outlet()}
			</div>
		`;
	}

}