import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import homeIconUrl from "../../assets/nav/home_icon.png?url";
import galleryIconUrl from "../../assets/nav/gallery_icon.png?url";
import blogIconUrl from "../../assets/nav/blog_icon.png?url";

@customElement("plat-navbar")
export class NavbarElement extends LitElement {

	protected render(): HTMLTemplateResult {
		return html`
			<nav>
				<a href="/">
					<span>Home</span>
				</a>
				<a href="/gallery">
					<span>Gallery</span>
				</a>
				<a href="/blog">
					<span>Blog</span>
				</a>
			</nav>

		`;
	}
	static styles: CSSResultGroup = css`
	`;
}
