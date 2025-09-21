import { Routes } from "@lit-labs/router";
import { html, LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./list/blog_list_page";
import "./blog_view";
import { ifDefined } from "lit/directives/if-defined.js";
import { BlogTagDB } from "../../blog_tags";
import { provide } from "@lit/context";
import { blogContext, type BlogData } from "./blog_context";


@customElement("plat-blog-page")
export class PlatBlogElement extends LitElement {

	@provide({context: blogContext})
	@property({attribute: false})
	public data: BlogData;
	private routes: Routes;

	constructor() {
		super();

		this.data = {
			tagDB: new BlogTagDB()
		};

		this.routes = new Routes(this, [
			{path: "list/", render: () => html`<plat-blog-list></plat-blog-list>`},
			{path: "view/:id", render: ({id}) => html`<plat-blog-view pageId=${ifDefined(id)}></plat-blog-view>`}
		]);
		

	}

	protected render(): TemplateResult {
		console.log(this.data)
		return html`
			<div>
				${this.routes.outlet()}
			</div>
		`;
	}
}