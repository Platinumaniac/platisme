import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

//FUNKY!
@customElement("plat-funky-box")
export class FunkyBoxElement extends LitElement {

	@property({ type: String })
	public label: string;

	public constructor() {
		super();
		this.label = "";
	}


	protected render(): HTMLTemplateResult {
		return html`
			<h2>${this.label}</h2>
			<div id="container">
				<slot id="content"></slot>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		h2 {
			position: absolute;

			padding: .75rem;
			border-radius: 2rem;
			margin: 0;

			background: var(--background-color-dark);

			font-size: 1.8rem;

			transform: rotateZ(7.5deg);
		}

		#container {
			box-sizing: border-box;
			height: 100%;
			padding: 1rem;
		}

		#content {
			box-sizing: border-box;
			height: 100%;
			border-radius: 1rem;
			padding: 1rem;
			padding-top: 2.8rem;
			border: solid .2rem transparent;

			display: block;

			overflow: hidden;

			background: var(--background-color-dark)

		}
	`;
}
