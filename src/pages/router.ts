import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "urlpattern-polyfill";
import "./index/index_page";
import "./about/about_page";
import "./blog/blog_page";
import "./../elements/basic/auto_redirect";
import "./activities/starshot";

@customElement("plat-router")
export class PlatRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();
		this.router = new Router(this, [
			{path: "/", render: () => html`<plat-index-page></plat-index-page>`},
			{path: "/about", render: () => html`<plat-about-page></plat-about-page>`},
			{path: "/blog", render: () => html`<plat-auto-redirect path="/blog/list/"></plat-auto-redirect>`},
			{path: "/blog/", render: () => html`<plat-auto-redirect path="/blog/list/"></plat-auto-redirect>`},
			{path: "/blog/*", render: () => html`<plat-blog-page></plat-blog-page>`},
			{path: "/starshot", render: () => html`<plat-starshot-page></plat-starshot-page>`}
		]);
	}

	protected render(): HTMLTemplateResult {
		return html`
			${this.router.outlet()}
		`;
	}

	static styles: CSSResultGroup = css`
		:host{
			height: 100%;
			
			display: block;
			
		}
	`;
}