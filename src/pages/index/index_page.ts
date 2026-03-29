import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult} from "lit";
import { customElement } from "lit/decorators.js";
import "urlpattern-polyfill";
import RspaceIconUrl from "../../assets/external/rspace.jpg?url";

import "../../elements/magic/wizard";
import "../../elements/magic/stardust";
import "../../elements/basic/navbar";


@customElement("plat-index-page")
export class IndexElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<plat-navbar id="nav"></plat-navbar>
			<div id="info">
				<h2>Plat is me</h2>
				<p>
					blah blah blah,
					blah blah blah,
					blah blah blah,
					blah blah blah,
					blah blah blah
				</p>
				<div>
					<h2>Socials</h2>
					<a href="https://bsky.app/profile/platinumaniac.bsky.social">Bluesky</a>
					<a href="https://codeberg.org/platinumaniac">Codeberg</a>
					<a href="https://github.com/Platinumaniac">Github</a>
				</div>
				<div>
					<h2>Also check out</h2>
					<a href="https://rspace.co.uk/">
						<img src=${RspaceIconUrl}/>
					</a>
				</div>
			</div>
			<plat-wizard id="wizard"></plat-wizard>
			<plat-stardust></plat-stardust>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			height: 100%;

			display: grid;
			grid-template-rows: max-content auto;
			grid-template-columns: 1fr 1fr;
			grid-template-areas: "nav nav" "info wizard"
		}

		#nav {
			grid-area: nav;
		}

		#info {
			grid-area: info;
			display: flex;
			flex-direction: column;
			align-self: center;
			justify-self: center;

			background: var(--bg-color-light);
		}

		#wizard {
			width: 80%;
			grid-area: wizard;
			align-self: center;
			justify-self: center;

		}



		h2 {
			margin: 0;
		}
	`;
}
