import type { BlogTagMetadata } from "./types";
import blogTagCollection from "./data/blog/tags.json"

export class BlogTagDB {

	private blogTags: BlogTagMetadata[];

	constructor() {
		this.blogTags = blogTagCollection.tags;
	}

	getTagMetadata(tagName: string): BlogTagMetadata | undefined {
		return this.blogTags.find((blogTag) => blogTag.name === tagName);
	}

	getTags(): BlogTagMetadata[] {
		return this.blogTags;
	}
}