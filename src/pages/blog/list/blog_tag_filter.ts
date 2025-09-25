import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDefaultBlogTagMetadata, type BlogTagMetadata } from "../../../types";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";

@customElement("plat-tag-filter")
export class TagFilterElement extends LitElement {

	@property({type: Object})
	public tag: BlogTagMetadata;

	public constructor() {
		super();
		
		this.tag = getDefaultBlogTagMetadata();
	}

	private onRemovePressed() {
		const removeEvent: CustomEvent = new CustomEvent("removePressed");
		this.dispatchEvent(removeEvent);
	}

	protected render(): HTMLTemplateResult {
		const containerStyles: StyleInfo = {
			"--tag-color": this.tag.color
		};
		
		const removeStyles: StyleInfo = {
			"--tag-alt-color": this.tag.alt_color
		};

		return html`
			<div style=${styleMap(containerStyles)}>
				<button 
				@click=${this.onRemovePressed} 
				class="remove"
				style=${styleMap(removeStyles)}
				>
					<img src="/src/assets/close_icon.png" alt="remove" class="icon close"/>
				</button>
				<img src=${this.tag.icon} alt=${this.tag.name} class="icon"/>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		div {
			--tag-color: #fff;

			display: flex;
			justify-content: center;

			position: relative;

			height: 100%;
			width: 5rem;
			

			margin-left: -1rem;

			clip-path: polygon(
				0 0,
				100% 0,
				100% 100%,
				1rem 100%

			);

			background: var(--tag-color);
		}

		.icon {
			height: 100%;
			aspect-ratio: 1 / 1;
			box-sizing: border-box;

			padding: .25rem;
			
			image-rendering: pixelated;
		}

		.close {
			height: 70%;
		}

		.remove {
			--tag-alt-color: #fff;

			position: absolute;
			
			width: 100%;
			height: 100%;

			opacity: 0;
			background: var(--tag-alt-color);

			border: none;

			cursor: pointer;
		}
		.remove:hover {
			opacity: 1;
		}
	`;
}