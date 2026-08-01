import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDefaultProjectEntry, type ProjectEntry } from "../../lib/types";
import "./project_tag";
import "../object_viewer";
import { map } from "lit/directives/map.js";
@customElement("plat-project-entry")
export class ProjectEntryElement extends LitElement {
	@property({ type: Object })
	public entry: ProjectEntry;

	constructor() {
		super();

		this.entry = getDefaultProjectEntry();
	}

	protected render(): HTMLTemplateResult {
		return html`
			<a href="/projects/${this.entry.id}">
				<plat-object-viewer objectpath=${this.entry.modelPath}></plat-object-viewer>
				<div id="info">
					<h2>${this.entry.title}</h2>
					<p>${this.entry.desc}</p>

				</div>
				<div id="tags">
					${map(this.entry.tags, tag => html`<plat-project-tag .tag=${tag}></plat-project-tag>`)}
				</div>


			</a>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			box-sizing: border-box;
			height: min-content;

			display: block;
		}

		plat-object-viewer {
			position: absolute;


			width: 15rem;
			min-height: 0;
			aspect-ratio: 1;
		}
		a {
			display: flex;

			text-decoration: none;
			color: white;
		}

		#info {
			box-sizing: border-box;
			width: 100%;
			padding: 2rem;
			padding-left: 10rem;
			border-radius: 2rem;
			margin: 4rem 0 0 4rem;

			background: var(--background-color-dark);
		}

		#tags {
			position: absolute;
			bottom: -1.5rem;
			right: 2rem;

			display: flex;
		}

		plat-project-tag{
			width: 3rem;
		}
	`;

}
