import { Router } from "@lit-labs/router";
import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../elements/redirect";
import "urlpattern-polyfill";
import ".";
import { PROJECTS } from "../../lib/projects";
import type { RouteConfig } from "@lit-labs/router";

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
					import(`/src/pages/projects/${PROJECT.id}`);
					return PROJECT.element;
				}
			});

		}
	}

	protected render(): HTMLTemplateResult {
		return html`
			<plat-navbar></plat-navbar>
			${this.router.outlet()}
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;
		}

		plat-navbar {
			position: fixed;

			z-index: 2;
		}
	`;
}
