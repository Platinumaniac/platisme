import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "urlpattern-polyfill";

@customElement("plat-router")
export class PlatRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();
		this.router = new Router(this, [
			{path: "/", render: () => html`<plat-index-page></plat-index-page>`},
		]);
	}

	protected render(): HTMLTemplateResult {
		return html`
			${this.router.outlet()}
		`;
	}
}
