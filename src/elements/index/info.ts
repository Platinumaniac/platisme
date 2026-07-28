import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../social_link";
import "../funky_box";

@customElement("plat-info")
export class PlatInfoElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<plat-funky-box label="Plat is me">
				<p>
					I am Platinumaniac and I made this site to host and showcase whatever I'm working on at any given moment. There will be some software, some art and occasionally a game or two.
				</p>
			</plat-funky-box>
			<div id="socials-container">
				<plat-social-link
					site="bluesky"
					href="https://bsky.app/profile/platinumaniac.bsky.social"
				></plat-social-link>
				<plat-social-link
					site="codeberg"
					href="https://codeberg.org/platinumaniac"
				></plat-social-link>
				<plat-social-link
					site="github"
					href="https://github.com/Platinumaniac"
				></plat-social-link>
			</div>

		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;
			padding-bottom: 1rem;
		}

		#socials-container {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);

			display: flex;
			gap: 2rem;
		}
	`;

}
