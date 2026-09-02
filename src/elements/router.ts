import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "urlpattern-polyfill";
import "./navbar";
import "../pages/index";
import "../pages/stuff/router";
import "../pages/projects/router";
@customElement("plat-router")
export class PlatRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();
		this.router = new Router(this, [
			{path: "/", render: () => html`<plat-index-page></plat-index-page>`},
			{path: "/#/stuff", render: () => html`<plat-redirect path="/stuff/menu"></plat-redirect>`},
			{path: "/#/stuff/*", render: () => html`<plat-stuff-router></plat-stuff-router>`},
			{path: "/#/projects", render: () => html`<plat-redirect path="/projects/menu"></plat-redirect>`},
			{path: "/#/projects/*", render: () => html`<plat-project-router></plat-project-router>` },
		]);

	}

	protected render(): HTMLTemplateResult {
		return html`

			${this.router.outlet()}
		`;
	}
	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			height: 100%;

		}
	`;
}
