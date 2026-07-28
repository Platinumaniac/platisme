import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDefaultProjectEntry, type ProjectEntry } from "../../lib/types";
import "./project_tag";
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
		console.log(this.entry);
		return html`
			<a href="/projects/${this.entry.id}">
				<h2>${this.entry.title}</h2>
				<p>${this.entry.desc}</p>
				${map(this.entry.tags, tag => html`<plat-project-tag .tag=${tag}></plat-project-tag>`)}
			</a>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: absolute;

		}

		a {
			text-decoration: none;
			color: white;
		}

		plat-project-tag{
			width: 3rem;
		}
	`;

}
