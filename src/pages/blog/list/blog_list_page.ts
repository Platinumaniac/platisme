import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { blogContext, type BlogData } from "../blog_context";
import { consume } from "@lit/context";
import { type BlogPostMetadata, type BlogTag, Tag } from "../../../types";
import "./blog_list_entry";
import "./blog_list_search";
import { Task } from "@lit/task";

@customElement("plat-blog-list")
export class PlatBlogListElement extends LitElement {

	@consume({context: blogContext})
	private blogData?: BlogData

	@state()
	private tagFilters: Tag[];

	private entryListTask: Task<Tag[], HTMLTemplateResult[]>;
	
	constructor() {
		super();

		this.tagFilters = [
		];

		this.entryListTask = new Task(this, {
			task: async (filters) => {return await this.loadEntries(filters)},
			args: () => [...this.tagFilters] as const
		});
	
	}

	private passesFilter(filters: readonly Tag[], blogPost: BlogPostMetadata): boolean {

		for (const filter of filters) {
			const matchingTag: BlogTag | undefined = blogPost.tags.find((tag) => tag.name === filter.toString());

			if (!matchingTag) {
				return false;
			}
		}

		return true;
	}

	private removeFilter(removeEvent: CustomEvent<number>) {
		this.tagFilters.splice(removeEvent.detail, 1);
		this.tagFilters = [...this.tagFilters];
	}

	private addFilter(addEvent: CustomEvent<string>) {

		for (const [key, tag] of Object.entries(Tag)) {

			if (key.toLowerCase() === addEvent.detail) {
				this.tagFilters.push(tag);
				this.tagFilters = [...this.tagFilters];
				
				return;
			}
		}
	}

	private async loadEntries(filters: readonly Tag[]): Promise<HTMLTemplateResult[]> {
		if (!this.blogData) return [];

		let entryFragments: HTMLTemplateResult[] = [];

		for (const entry of this.blogData.publicEntries) {
			let entryMeta: BlogPostMetadata;

			try {
				entryMeta = await import(`../entries/${entry}/meta.json`) as BlogPostMetadata;

				if (!this.passesFilter(filters, entryMeta)) continue;

				entryFragments.push(
					html`
						<plat-blog-list-entry .postMetadata=${entryMeta}>
						</plat-blog-list-entry>
					`);
			} catch (error) {
				throw(error);
			}
		}

		return entryFragments;
	}

	protected render(): HTMLTemplateResult {
		
		return html`
			<div>
				<plat-blog-search 
				.tagFilters=${this.tagFilters} 
				@remove=${this.removeFilter}
				@add=${this.addFilter}></plat-blog-search>
				${this.entryListTask.render({
					initial: () => html`<div>entries go here</div>`,
					pending: () => html`<div>loading</div>`,
					complete: (entries) => entries
				})}
			</div>
		`;
	}

}