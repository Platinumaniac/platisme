import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("plat-blog-tag")
export class BlogTagElement extends LitElement {

	@property({type: String})
	public tag: string;

	public constructor() {
		super();

		this.tag = "";
	}

	protected render(): HTMLTemplateResult {
		return html`
			<img src="/src/assets/tags/${this.tag}.png"/>
		`;
	}

	static styles: CSSResultGroup = [
		css`
			img {
				width: 4rem;
				aspect-ratio: 1 / 1;

				image-rendering: pixelated;
			}
		`
	];
}