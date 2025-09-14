import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { BlogPostMetadata } from "../../../types";
import "../blog_tag";

@customElement("plat-blog-list-entry")
export class PlatBlogListEntryElement extends LitElement {

	@property({type: Object})
	public postMetadata: BlogPostMetadata;

	public constructor() {
		super();
		this.postMetadata = {
			heroPath: "/src/assets/platsei.png",
			title: "Plat the maniac",
			description: "Violent, may kill you",
			postId: "",
			tags: []
		};
	}

	private renderTags(): HTMLTemplateResult[] {
		let renderedTags: HTMLTemplateResult[] = [];

		for (const tag of this.postMetadata.tags) {
			renderedTags.push(html`<plat-blog-tag tag="${tag.name}"></plat-blog-tag>`);
		}

		return renderedTags;

	}

	protected render(): HTMLTemplateResult {
		return html`
			<a href=/blog/view/${this.postMetadata.postId} class="pill" draggable="false">
				<img class="hero" src=${this.postMetadata.heroPath}/>
				<div class="text-container">
					<h2>${this.postMetadata.title}</h2>
					<div class="description">${this.postMetadata.description}</div>
				</div>
				<div class="tags">
					${this.renderTags()}
				</div>
			</a>
		`;
	}

	static styles?: CSSResultGroup = [
		css`
			:host {
				width: 100%;
			}

			.pill {
				position: relative;

				display: grid;
				grid-template-columns: 20rem auto;
				grid-auto-rows: 20rem;

				background: var(--accent-color);
				color: white;

				text-decoration: none;

			}

			.hero {
				min-width: 20rem;
				min-height: 20rem;

				clip-path: polygon(
					0 0, 
					16rem 0, 
					20rem 20rem, 
					0 20rem);
			}

			.description {
				padding: 1rem;
			}

			.tags {
				display: flex;
				gap: 1rem;

				position: absolute;
				right: 2rem;
				bottom: -2rem;
			}

		`
	];
}