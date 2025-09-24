import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Tag, type BlogTagMetadata } from "../../../types";
import "../blog_tag";
import "./blog_tag_filter";
import "../../../elements/basic/button_dropdown";
import { blogContext, type BlogData } from "../blog_context";
import { consume } from "@lit/context";
import { Task } from "@lit/task";


@customElement("plat-blog-search")
export class BlogSearchElement extends LitElement {

	@consume({context: blogContext})
	private blogData?: BlogData

	@property({type: Array})
	public tagFilters: Tag[];

	private tagMetaTask: Task<Tag[], BlogTagMetadata[]>;

	constructor() {
		super();

		this.tagFilters = [];
		this.tagMetaTask = new Task(this, {
			args: () => [...this.tagFilters],
			task: async () => {
				if (!this.blogData) return [];

				await this.blogData.tagDB.loadBlogTags();
				
				return this.blogData.tagDB.getTags();
			}
		}
		)
	}

	private removeTagFilter(index: number) {
		const removeEvent: CustomEvent<number> = new CustomEvent("remove", {detail: index});
		this.dispatchEvent(removeEvent);
	}

	private addTagFilter(tag: string) {
		
		const addEvent: CustomEvent<string> = new CustomEvent("add", {detail: tag});
		this.dispatchEvent(addEvent);
	}

	private renderTagFilterFragments(): HTMLTemplateResult[] {
		let tagFragments: HTMLTemplateResult[] = [];

		for (const [index, filter] of this.tagFilters.entries()) {
			tagFragments.push(
				html`<plat-tag-filter tag=${filter.toString()} @removePressed=${() => {this.removeTagFilter(index)}}></plat-tag-filter>`
			);
		}

		return tagFragments;
	}
	private renderAddTagFragments(tags: BlogTagMetadata[]): HTMLTemplateResult[] {
		if (!this.blogData) return [];

		let tagFragments: HTMLTemplateResult[] = [];

		for (const tag of tags) {
			if (this.tagFilters.find((filter) => filter.toString() === tag.name)) continue;


			tagFragments.push(html`
					<button @click=${() => {this.addTagFilter(tag.name)}}>${tag.name}</button>
				`);
		}

		return tagFragments;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div class="search-container">
				<input type="text"/>
				${this.tagMetaTask.render({
					initial: () => html`<div>huh</div>`,
					pending: () => html`<div>what</div>`,
					complete: (tagMetas) => html`
						${this.renderTagFilterFragments()}
						<plat-dropdown-button label="+">
							${this.renderAddTagFragments(tagMetas)}
						</plat-dropdown-button>
					`
				})}
				
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
			.search-container {
				display: flex;
			}
		`;
}