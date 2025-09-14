import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./blog_list_entry";
import type { BlogPostMetadata, BlogTag } from "../../../types";


enum Tag {
	Big = "big",
	Small = "small",
	Info = "info",
	Game = "game"
}


@customElement("plat-blog-list")
export class PlatBlogListElement extends LitElement {
	
	entryPaths: string[];
	entries: HTMLTemplateResult[];
	tagFilters: Tag[]
	basePath: string;

	constructor() {
		super();
		this.basePath = "../entries/";
		this.entries = [];
		this.tagFilters = [];
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
		return html`
			<div class="list">
				${this.entries}
			</div>
		`;
	}

	static styles?: CSSResultGroup = [
		css`
			:host {
				width: 100%;
				display: flex;
				justify-content: center;
			}

			.list {
				width: 50%;

				display: grid;
				gap: 3rem;
				align-items: center;
			}
		`
	];
}