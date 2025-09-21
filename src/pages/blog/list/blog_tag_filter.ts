import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("plat-tag-filter")
export class TagFilterElement extends LitElement {

	@property({type: String})
	public tag: string;

	constructor() {
		super();
		this.tag = "";
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div class="tag-filter">
				<img src="/src/assets/tags/${this.tag}.png"/>
				<button class="tag-filter-remove"><img src="/src/assets/close_icon.png"/></button>
			</div>
		`;
	}

	static styles: CSSResultGroup =  css`
		:host {
			height: 100%;
		}

		.tag-filter {
			position: relative;

			box-sizing: border-box;
			height: 100%;
			width: 8rem;

			display: flex;
			align-items: center;
			justify-content: center;

			margin-left: -1.6rem;

			clip-path: polygon(
				1.6rem 0,
				100% 0,
				100% 100%,
				0 100%
			);

			background: #c03048;
		}

		.tag-filter-remove {
			transition: .1s opacity;

			display: flex;
			align-items: center;
			justify-content: center;

			position: absolute;
			
			height: 100%;
			width: 100%;

			background: #972669;
			opacity: 0;

			font-size: 2.5rem;
			text-align: center;

			border: none;
			border-radius: 0;

			
			
			cursor: pointer;
		}
		.tag-filter-remove > img {
			height: 2.5rem;
			aspect-ratio: 1 / 1;
			image-rendering: pixelated;
		}

		.tag-filter-remove:hover {
			transition: .2s opacity;

			opacity: 1;
		}

		img {
			height: 3rem;
			aspect-ratio: 1 / 1;

			image-rendering: pixelated;
		}
	`;
}