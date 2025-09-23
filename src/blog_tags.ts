import type { BlogTagDataCollection, BlogTagMetadata } from "./types";

export class BlogTagDB {

	private blogTags: BlogTagMetadata[];

	constructor() {
		this.blogTags = [];
		this.loadBlogTags();
	}

	async loadBlogTags() {
		try {
			let tagCollection = await import("./data/blog/tags.json") as BlogTagDataCollection;
			this.blogTags = tagCollection.tags;
		}
		catch {
			//todo: add error handling
		}
	}

	getTagMetadata(tagName: string): BlogTagMetadata | undefined {
		return this.blogTags.find((blogTag) => blogTag.name === tagName);
	}
}