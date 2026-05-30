import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import homeButtonSrc from "/src/assets/layout/navbar/home_button.png";
import projectButtonSrc from "/src/assets/layout/navbar/projects_button.png";
import StuffButtonSrc from "/src/assets/layout/navbar/stuff_button.png";

@customElement("plat-navbar")
export class NavbarElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<nav>
				<a href="/" class="nav-link"><img src=${homeButtonSrc} alt="home button"/></a>
				<a href="/projects/menu" class="nav-link"><img src=${projectButtonSrc} alt="home button"/></a>
				<a href="/stuff/menu" class="nav-link"><img src=${StuffButtonSrc} alt="home button"/></a>
			</nav>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			width: 100%;

			display: flex;
			background: url("/src/assets/layout/navbar/nav_background.png") 0 0 / 6rem 4rem repeat no-repeat;
			image-rendering: pixelated;
		}

		nav {
			padding: 1rem;

			display: flex;
			gap: 2rem;

			background: url("/src/assets/layout/navbar/nav_button_background.png") 0 0 / 18rem 6rem;
		}

		.nav-link {
			width: 4rem;
			height: 4rem;

			img {
				width: 100%;
			}
		}

		@media(max-width: 400px) {
			:host {
				justify-content: center;
			}
		}
	`;
}
