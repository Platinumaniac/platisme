import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import codebergLogoUrl from "/src/assets/index/codeberg_logo.png";
import githubLogoUrl from "/src/assets/index/github_logo.png";
import blueskyLogoUrl from "/src/assets/index/bluesky_logo.png";
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
				<a href="https://bsky.app/profile/platinumaniac.bsky.social" target="blank" class="social">
					<img src=${blueskyLogoUrl} alt="bluesky"/>
				</a>
				<a href="https://codeberg.org/platinumaniac" target="blank" class="social">
					<img src=${codebergLogoUrl} alt="codeberg"/>
				</a>
				<a href="https://github.com/Platinumaniac" target="blank" class="social">
					<img src=${githubLogoUrl} alt="github"/>
				</a>
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

		.social > img {
			height: 5rem;

			image-rendering: pixelated;
		}
	`;

}
