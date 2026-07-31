import { html, type HTMLTemplateResult } from "lit";

export type MainPageData = {
	name: string,
	color: string,
	href: string,
	regex: RegExp,
}


export type StuffPageData = {
	iconPath: string,
	id: string,
}

export type ProjectTag = {
	id: string,

}

export type ProjectEntry = {
	id: string,
	title: string,
	desc: string, // fuck you, thats why
	modelPath: string,
	tags: ProjectTag[],
	element: HTMLTemplateResult,
};

export function getDefaultProjectEntry(): ProjectEntry {
	return {
		id: "",
		title: "",
		desc: "",
		modelPath: "",
		tags: [],
		element: html`<div></div>`
	};
}

export function getDefaultProjectTag(): ProjectTag {
	return {
		id: "",
	}
}
