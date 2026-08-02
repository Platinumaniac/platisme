import { html, type HTMLTemplateResult } from "lit";
import { ART_TAG, RUST_TAG } from "./project_tags"
import type { ProjectEntry } from "./types"
import PIPE_CASE from "/src/assets/models/pipe_case_outlined.glb?url";

export class ProjectPage {
	public render(): HTMLTemplateResult {
		return html``;
	}
}


const PIPE: ProjectEntry = {
	id: "plat_icon_package_editor",
	title: "Plat Icon Package Editor",
	desc: "Editor for IDE icon packages",
	modelPath: PIPE_CASE,
	tags: [RUST_TAG, ART_TAG],
	element: html`<pipe-project></pipe-project>`,
}


export const PROJECTS = [PIPE];
