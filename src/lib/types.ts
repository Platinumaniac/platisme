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
	tags: ProjectTag[],
};

export function getDefaultProjectEntry(): ProjectEntry {
	return {
		id: "",
		title: "",
		desc: "",
		tags: [],
	};
}

export function getDefaultProjectTag(): ProjectTag {
	return {
		id: "",
	}
}
