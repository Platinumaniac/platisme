import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./blog_list_entry";
import type { BlogPostMetadata } from "../../../types";

@customElement("plat-blog-list")
export class PlatBlogListElement extends LitElement {
	
	entryPaths: string[];
	entries: HTMLTemplateResult[];
	basePath: string;

	constructor() {
		super();
		this.basePath = "../entries/";
		this.entries = [];
		this.entryPaths = [
			"template"
		];
		
	}

	connectedCallback(): void {
		this.loadEntries();
	}

	async loadEntries() {
		this.entries = [];

		for (const entry of this.entryPaths) {
			let entryMeta: BlogPostMetadata;

			try {
				entryMeta = await import(`${this.basePath}${entry}/meta.json`) as BlogPostMetadata
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
				display: grid;
				grid-template-columns: 30rem 30rem;
				gap: 1rem;
				align-items: center;
			}
		`
	];
}