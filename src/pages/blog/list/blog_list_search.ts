import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Tag, type BlogTagMetadata } from "../../../types";
import "../blog_tag";
import "./blog_tag_filter";
import "../../../elements/basic/button_dropdown";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import { blogData } from "../blog_data";


@customElement("plat-blog-search")
export class BlogSearchElement extends LitElement {

	@property({type: Array})
	public tagFilters: Tag[];

	constructor() {
		super();

		this.tagFilters = [];
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
		const tags: BlogTagMetadata[] = blogData.tagDB.getTags();
		let tagFragments: HTMLTemplateResult[] = [];

		for (const [index, filter] of this.tagFilters.entries()) {
			const tagMeta: BlogTagMetadata | undefined = tags.find((tag) => tag.name === filter.toString())
			if (!tagMeta) continue;

			tagFragments.push(
				html`<plat-tag-filter .tag=${tagMeta} @removePressed=${() => {this.removeTagFilter(index)}}></plat-tag-filter>`
			);
		}

		return tagFragments;
	}
	private renderAddTagFragments(): HTMLTemplateResult[] {
		const tags: BlogTagMetadata[] = blogData.tagDB.getTags();

		let tagFragments: HTMLTemplateResult[] = [];

		for (const tag of tags) {
			if (this.tagFilters.find((filter) => filter.toString() === tag.name)) continue;

			const tagStyle: StyleInfo = {
				"--tag-color": tag.color,
				"--tag-alt-color": tag.alt_color,
				"--tag-font-color": tag.font_color
			};

			tagFragments.push(html`
					<button
						style=${styleMap(tagStyle)}
						@click=${() => {this.addTagFilter(tag.name)}}
						class="dropdown-item"
						slot="content"
						>
						<img src=${tag.icon} />
						<span>${tag.name}</span>
					</button>
				`);
		}

		return tagFragments;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div class="search-container">
				<input type="text"/>
				${this.renderTagFilterFragments()}

				<plat-dropdown-button label="+">
					<img 
						src="/src/assets/plus_icon.png"
						class="add-icon"
						slot="button"/>
					${this.renderAddTagFragments()}
				</plat-dropdown-button>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
			* {
				font-family: Atkinson Hyperlegible Next;
				font-weight: 650;
			}


			.search-container {
				display: flex;
				height: 100%;
				width: 100%;
			}

			input {
				flex: 1;
			}

			plat-dropdown-button {
				height: 100%;
				aspect-ratio: 1 / 1;
				
			}

			.add-icon {
				height: 60%;

				image-rendering: pixelated;
			}

			.dropdown-item {
				--tag-color: #fff;
				--tag-alt-color: #fff;
				--tag-font-color: #000;

				display: flex;
				gap: .5rem;
				align-items: center;

				font-size: 1rem;

				color: var(--tag-font-color);
				background: var(--tag-color);

				padding: .5rem;
				border: none;

				cursor: pointer;
			}
			.dropdown-item:hover {
				background: var(--tag-alt-color);
			}
		
			.dropdown-item > img {
				image-rendering: pixelated;

				height: 2rem;
			}
		`;
}