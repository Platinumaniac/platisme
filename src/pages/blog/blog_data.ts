import { BlogTagDB } from "../../blog_tags"

export type BlogData = {
	tagDB: BlogTagDB;
	publicEntries: string[];
}

export const blogData = {
	tagDB: new BlogTagDB(),
	publicEntries: [
		"3",
		"template"
	]
}