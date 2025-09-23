import { Routes } from "@lit-labs/router";
import { html, LitElement, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { blogContext, type BlogData } from "./blog_context";
import "./list/blog_list_page";
import "./blog_view";
import { ifDefined } from "lit/directives/if-defined.js";
import { BlogTagDB } from "../../blog_tags";
import { provide } from "@lit/context";

@customElement("plat-blog-page")
export class PlatBlogElement extends LitElement {

	@provide({context: blogContext})
	@state()
	public blogData: BlogData;
	private routes: Routes;

	constructor() {
		super();

		this.blogData = {
			tagDB: new BlogTagDB(),
			publicEntries: [
				"3",
				"template"
			]
		};

		this.routes = new Routes(this, [
			{path: "list/", render: () => html`<plat-blog-list></plat-blog-list>`},
			{path: "view/:id", render: ({id}) => html`<plat-blog-view pageId=${ifDefined(id)}></plat-blog-view>`}
		]);
		

	}

	protected render(): TemplateResult {
		return html`
			<div>
				${this.routes.outlet()}
			</div>
		`;
	}
}