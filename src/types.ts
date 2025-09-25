export enum Tag {
	Big = "big",
	Small = "small",
	Info = "info",
	Game = "game"
}

export type BlogPostMetadata = {
	heroPath: string;
	title: string;
	description: string;
	postId: string;
	tags: BlogTag[];
}

export type BlogTag = {
	name: string;
}

export type BlogTagDataCollection = {
	tags: BlogTagMetadata[]
}

export type BlogTagMetadata = {
	name: string;
	icon: string;
	color: string;
	alt_color: string;
	font_color: string;
}
export function getDefaultBlogTagMetadata(): BlogTagMetadata {
	return {
		name: "",
		icon: "",
		color: "",
		alt_color: "",
		font_color: ""
	};
}