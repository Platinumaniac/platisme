import { Router } from "@lit-labs/router";
import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../elements/redirect";
import "urlpattern-polyfill";
import ".";
import { PROJECTS } from "../../lib/projects";

@customElement("plat-project-router")
export class StuffRouterElement extends LitElement {
	private router: Router;

	constructor() {
		super();

		this.router = new Router(this, [
			{ path: "", render: () => html`<plat-redirect path="/projects/menu"></plat-redirect>` },
			{ path: "menu", render: () => html`<plat-project-page></plat-project-page>` },
		]);


		for (const PROJECT of PROJECTS) {
			this.router.routes.push({
				path: `${PROJECT.id}`,
				render: () => {
					import(`./${PROJECT.id}/index.ts`);
					return PROJECT.element;
				}
			});

		}
	}

	protected render(): HTMLTemplateResult {
		return html`

			${this.router.outlet()}
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			height: 100%;

			display: grid;

		}
	`;
}
