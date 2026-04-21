import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDefaultProjectEntry, type ProjectEntry } from "../../types";
import { map } from "lit/directives/map.js";
@customElement("plat-project-entry")
export class ProjectEntryElement extends LitElement {
	@property({ type: Object })
	public entry: ProjectEntry;

	constructor() {
		super();

		this.entry = getDefaultProjectEntry();
	}

	private loadTagIconUrls(): URL[] {
		let urls: URL[] = [];
		for (const tag of this.entry.tags) {
			urls.push(new URL(`/src/assets/projects/tags/${tag.id}.png`, import.meta.url));
		}

		return urls;
	}

	protected render(): HTMLTemplateResult {

		let imageUrl = new URL(`/src/pages/projects/${this.entry.id}/thumb.png`, import.meta.url);

		const tagIconUrls = this.loadTagIconUrls();

		return html`
				<h3>${this.entry.title}</h3>
				<img src=${imageUrl}/>
				<div id="tags">
					${map(tagIconUrls, (tagIconUrl) => html`<img src=${tagIconUrl} class="tag"/>`)}
				</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			display: flex;
			flex-direction: column;
		}

		.tag {
			width: 3rem;

			image-rendering: pixelated;
		}
	`;
}
