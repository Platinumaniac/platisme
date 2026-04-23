import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";
import type { ProjectEntry } from "../../types";
import { map } from "lit/directives/map.js";
import "../../elements/projects/project_entry.ts";

@customElement("plat-project-page")
export class ProjectPageElement extends LitElement {

	private projectTask: Task<[], ProjectEntry[]>;


	public constructor() {
		super();

		this.projectTask = new Task(this, {
			task: async () => {
				return (await import("./project_index.ts")).default;
			},
			args: () => []
		});

	}

	protected render(): HTMLTemplateResult {
		return html`
			${this.projectTask.render({
				pending: () => html`loading projects`,
				complete: (value) => html`${map(value, (project) => html`
					<plat-project-entry .entry=${project}></plat-project-entry>
					`)}`
			})}
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			box-sizing: border-box;
			height: 100%;

			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(3, 1fr);
		}
	`;
}
