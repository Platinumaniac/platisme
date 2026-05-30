import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDefaultProjectTag, type ProjectTag } from "../../lib/types";

@customElement("plat-project-tag")
export class ProjectTagElement extends LitElement {

	@property({ type: Object })
	private tag: ProjectTag;

	public constructor() {
		super();

		this.tag = getDefaultProjectTag();
	}

	protected render(): HTMLTemplateResult {

		const tagUrl = new URL(`/src/assets/projects/tags/${this.tag.id}.png`, import.meta.url);

		return html`
			<img src=${tagUrl} draggable="false" />
			`;
	}

	static styles: CSSResultGroup = css`
		:host {
			display: block;
		}

		img {
			width: 100%;

			image-rendering: pixelated;

			user-select: none;
		}
	`;
}
