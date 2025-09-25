import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "urlpattern-polyfill";
import "./index/index_page";
import "./blog/blog_page";
import "./../elements/basic/auto_redirect";

@customElement("plat-router")
export class PlatRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();
		this.router = new Router(this, [
			{path: "/", render: () => html`<plat-index-page></plat-index-page>`},
			{path: "/blog", render: () => html`<plat-auto-redirect path="/blog/list/"></plat-auto-redirect>`},
			{path: "/blog/", render: () => html`<plat-auto-redirect path="/blog/list/"></plat-auto-redirect>`},
			{path: "/blog/*", render: () => html`<plat-blog-page></plat-blog-page>`}
		]);
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div>
				${this.router.outlet()}
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host, div {
			display: flex;
			flex-direction: column;

			height: 100%;
		}
	`;
}