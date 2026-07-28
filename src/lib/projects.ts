import { html, type HTMLTemplateResult } from "lit";
import { ART_TAG } from "./project_tags"
import type { ProjectEntry } from "./types"

export class ProjectPage {
	public render(): HTMLTemplateResult {
		return html``;
	}
}


const PIPE: ProjectEntry = {
	id: "plat_icon_package_editor",
	title: "Plat Icon Package Editor",
	desc: "Editor for IDE icon packages",
	modelPath: "/src/assets/models/pipe_case.glb",
	tags: [ART_TAG],
	element: html`<pipe-project></pipe-project>`,
}


export const PROJECTS = [PIPE];
