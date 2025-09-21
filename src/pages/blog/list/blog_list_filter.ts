import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../blog_tag";
import "./blog_tag_filter";
import type { Tag } from "../../../types";

@customElement("plat-blog-filter")
export class BlogFilterElement extends LitElement {

	@property({type: Array})
	public tagFilters: Tag[];

	constructor() {
		super();
		this.tagFilters = [];
	}

	private renderTagFilterFragments(): HTMLTemplateResult[] {
		let tagFilterFragments: HTMLTemplateResult[] = [];

		for (const tagFilter of this.tagFilters) {
			
			tagFilterFragments.push(html`<plat-tag-filter tag=${tagFilter.toString()}></plat-tag-filter>`)
		}
		
		return tagFilterFragments;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div class="search">
				<input type="text" class="search-bar"/>
				${this.renderTagFilterFragments()}
				<button class="add-filter"><img src="/src/assets/plus_icon.png"/></button>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		.search {
			display: flex;
			align-items: center;
			
			height: 100%;
		}
		.search-bar {
			box-sizing: border-box;
			height: 100%;
			width: 100%;

			display: flex;
		}

		.add-filter {
			height: 100%;
			width: 7rem;

			padding-left: 1.6rem;

			margin-left: -1.6rem;

			border: none;
			border-radius: 0;

			display: flex;
			align-items: center;
			justify-content: center;

			clip-path: polygon(
				1.6rem 0,
				100% 0,
				100% 100%,
				0 100%
			);

			

			cursor: pointer;
		}
		.add-filter > img {
			width: 2.5rem;

			image-rendering: pixelated;
		}
		
	`;
}