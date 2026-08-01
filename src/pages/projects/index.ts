import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../elements/projects/project_entry.ts";
import "../../elements/navbar.ts";
import { PROJECTS } from "../../lib/projects.ts";
import "../../elements/projects/project_entry.ts";
import { map } from "lit/directives/map.js";

@customElement("plat-project-page")
export class ProjectPageElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<plat-navbar></plat-navbar>
			<div id="projects">
				${map(PROJECTS, (project) => {
					console.log(project);
					return html`
					<plat-project-entry .entry=${project}></plat-project-entry>
				`;
				})}
			</div>

		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			height: 100%;

			display: grid;
			grid-template-rows: max-content auto;
		}

		#projects {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-auto-rows: min-content;
		}
	`;

}
