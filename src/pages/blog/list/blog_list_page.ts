import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./blog_list_entry";
import "./blog_list_filter";
import { Tag, type BlogPostMetadata, type BlogTag } from "../../../types";
import { blogContext, type BlogData } from "../blog_context";
import { consume } from "@lit/context";
import type { BlogTagDB } from "../../../blog_tags";

@customElement("plat-blog-list")
export class PlatBlogListElement extends LitElement {

	@consume({context: blogContext, subscribe: true})
	@property({attribute: false})
	private data?: BlogTagDB;

	private entryPaths: string[];
	private entries: HTMLTemplateResult[];
	private tagFilters: Tag[]
	private basePath: string;

	constructor() {
		super();
		this.basePath = "../entries/";
		this.entries = [];
		this.tagFilters = [
			Tag.Game
		];
		this.entryPaths = [
			"template",
			"3"
		];	
	}

	connectedCallback(): void {
		this.loadEntries();
	}

	private passesFilter(tags: BlogTag[]): boolean {
		let matches: number = 0;

		for (const filter of this.tagFilters) {
			for (const tag of tags) {
				if (tag.name == filter.toString()) {
					matches += 1;
				}
			}
		}

		return matches == this.tagFilters.length;
	}

	async loadEntries() {
		this.entries = [];

		for (const entry of this.entryPaths) {
			let entryMeta: BlogPostMetadata;

			try {
				entryMeta = await import(`${this.basePath}${entry}/meta.json`) as BlogPostMetadata;

				if (this.tagFilters.length > 0) {
					if (!this.passesFilter(entryMeta.tags)) continue;
				}	

				this.entries.push(
					html`
						<plat-blog-list-entry .postMetadata=${entryMeta}>
						</plat-blog-list-entry>
				`);
			} catch (error) {
				
			}
		}
		this.scheduleUpdate();
	}

	protected render(): HTMLTemplateResult {
		console.log(this.data);
		return html`
			<div>
				<plat-blog-filter .tagFilters=${this.tagFilters}></plat-blog-filter>
			</div>
			<div class="list">
				${this.entries}
			</div>
		`;
	}

	static styles?: CSSResultGroup = css`
		:host {
			display: grid;
			grid-template-rows: 4rem auto;
			grid-template-columns: 85%;
			justify-content: center;
			gap: 1rem;

			margin: 1rem;
		}

		.list {
			display: grid;
			gap: 3rem;
			align-items: center;
		}
	`;
}