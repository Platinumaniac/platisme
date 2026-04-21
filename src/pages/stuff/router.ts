import { Router } from "@lit-labs/router";
import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "urlpattern-polyfill";
import ".";

@customElement("plat-stuff-router")
export class StuffRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();

		this.router = new Router(this, [
		{ path: "", render: () => html`<plat-redirect path="/stuff/menu"></plat-redirect>` },
			{ path: "menu", render: () => html`<plat-stuff-page></plat-stuff-page>` },
		]);
	}

	protected render(): HTMLTemplateResult {
		return html`
			${this.router.outlet()}
		`;
	}
}
