import { css, html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Tag } from "../../../types";
import "../blog_tag";
import "./blog_tag_filter";
import "./blog_tag_filter";


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

	private renderTagFilterFragments(): HTMLTemplateResult[] {
		let tagFragments: HTMLTemplateResult[] = [];

		for (const [index, filter] of this.tagFilters.entries()) {
			tagFragments.push(
				html`<plat-tag-filter tag=${filter.toString()} @removePressed=${() => {this.removeTagFilter(index)}}></plat-tag-filter>`
			);
		}

		return tagFragments;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div>
				<input type="text"/>
				${this.renderTagFilterFragments()}
			</div>
		`;
	}
}