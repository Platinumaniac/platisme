import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import rSpaceImgUrl from "/src/assets/external/rspace.jpg";
import "../../elements/magic/starhail";

@customElement("plat-index-page")
export class IndexPageElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`

			<div id="info-wrapper">
				<div id="info">
					<h2>Plat is me</h2>
					<p>
						something something, i am the plat something something
					</p>
					<h2>Also check out</h2>
					<div>
						<a href="https://rspace.co.uk" target="blank">
							<img src=${rSpaceImgUrl} class="external"/>
						</a>

					</div>
				</div>
				<div id="wizard">

				</div>
			</div>
			<plat-starhail></plat-starhail>
		`;
	}

	static styles: CSSResultGroup = css`
		#info-wrapper {
			height: 100%;

			display: grid;
			grid-template-columns: 1fr 1fr;
			align-items: center;
			justify-content: center;
		}

		#info {
			width: 75%;

			justify-self: center;
		}

		img.external {
			aspect-ratio: 1;
			border-radius: 50%;
		}
	`;
}
