import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { BlogPostMetadata } from "../../../types";

@customElement("plat-blog-list-entry")
export class PlatBlogListEntryElement extends LitElement {

	@property({type: Object})
	postMetadata: BlogPostMetadata;

	constructor() {
		super();
		this.postMetadata = {
			heroPath: "/src/assets/platsei.png",
			title: "Plat the maniac",
			description: "Violent, may kill you",
			postId: ""
		};
	}

	protected render(): HTMLTemplateResult {
		return html`
			<a href=/blog/view/${this.postMetadata.postId} class="pill">
				<img class="hero" src=${this.postMetadata.heroPath}/>
				<div class="text-container" >
					<h2>${this.postMetadata.title}</h2>
					<div>${this.postMetadata.description}</div>
				</div>
			</a>
		`;
	}

	static styles?: CSSResultGroup = [
		css`
			.pill {
				display: grid;
				grid-template-columns: 15rem;
				grid-template-rows: 15rem 10rem;

				background: var(--accent-color);
				color: white;

				text-decoration: none;
			}

			.hero {
				min-height: 30rem;
				min-width: 30rem;
				clip-path: polygon(
					0 0,
					30rem 0,
					30rem 15rem,
					0 12rem);
			}

			.text-container {
				padding: 0 1rem 0 1rem;
			}
			h2 {
				font-size: 2rem;
			}
		`
	];
}