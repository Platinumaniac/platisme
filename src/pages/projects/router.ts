import { Router } from "@lit-labs/router";
import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../elements/redirect";
import "urlpattern-polyfill";
import ".";

@customElement("plat-project-router")
export class StuffRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();

		this.router = new Router(this, [
			{ path: "", render: () => html`<plat-redirect path="/projects/menu"></plat-redirect>` },
			{ path: "menu", render: () => html`<plat-project-page></plat-project-page>` },
		]);
	}

	protected render(): HTMLTemplateResult {
		return html`
			${this.router.outlet()}
		`;
	}
}
