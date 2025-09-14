
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