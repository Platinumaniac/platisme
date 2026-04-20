import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("plat-navbar")
export class NavbarElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<nav>
				<a href="/stuff/menu">stuff</a>
				<a href="/projects/menu">projects</a>
			</nav>
			<div id="page-actions">
				<button id="light-mode">enter light mode</button>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			box-sizing: border-box;
			padding: 1rem;

			display: grid;
			grid-template-columns: 1fr 1fr;

			background: var(--accent-color);
		}

		nav {
			a {
				color: white;
				text-decoration: none;
			}
		}

		#page-actions {
			display: flex;
			justify-content: flex-end;
		}
	`;
}
