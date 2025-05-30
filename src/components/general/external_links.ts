import { css, CSSResult, html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("plat-external-links")
export class ExternalLinks extends LitElement {

	protected render(): HTMLTemplateResult {
		return html`
			<h2>Also check out</h2>
			<div>
				<a href="https://rspace.co.uk" target="blank" >
					<img src="/src/assets/rspace.jpg" />
				</a>
			</div>
		`;
	}

	static styles: CSSResult = css`

		div {
			display: flex;
		}

		a {
			display: flex;
			border-radius: 50%;
		}

		img {
			border-radius: 50%;
		
		}
	
	`;

}