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
				<a href="/projects/${this.entry.id}/view">
					<img src=${imageUrl}/>
					<div>
						<h3>${this.entry.title}</h3>
						<p>lorem ipsun</p>
					</div>
				</a>
				<div id="tags">
					${map(tagIconUrls.entries(), ([index, tagIconUrl]) => html`<img src=${tagIconUrl} alt=${this.entry.tags[index].id}-tag class="tag"/>`)}
				</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			box-sizing: border-box;
			height: 100%;
			padding: 1rem;

		}

		a {
			height: 100%;
			border-radius: 1rem;

			display: grid;
			grid-template-rows: 2fr 1fr;


			background: var(--background-color-light);
			color: white;

			text-decoration: none;
		}

		img {
			min-height: 0;
			width: 100%;
			height: 100%;

			object-fit: cover;
		}

		#tags {
			position: absolute;

			bottom: 0;
		}

		.tag {
			width: 3rem;

			image-rendering: pixelated;
		}
	`;
}
