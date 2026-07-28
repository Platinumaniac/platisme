import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import codebergLogoUrl from "/src/assets/external/codeberg_logo.png";
import githubLogoUrl from "/src/assets/external/github_logo.png";
import blueksyLogoUrl from "/src/assets/external/bluesky_logo.png";

const LOGO_MAP: Map<string, string> = new Map([
	["codeberg", codebergLogoUrl],
	["github", githubLogoUrl],
	["bluesky", blueksyLogoUrl],
]);

@customElement("plat-social-link")
export class SocialLinkElement extends LitElement {
	@property({ type: String })
	public site: "codeberg" | "github" | "bluesky";

	@property({ type: String })
	public href: string;

	public constructor() {
		super();

		this.site = "codeberg";
		this.href = "";
	}

	protected render(): HTMLTemplateResult {
		return html`
			<a href=${this.href} target="blank">
				<img src=${LOGO_MAP.get(this.site)}/>
			</a>
		`;
	}

	static styles: CSSResultGroup = css`
		img {
			height: 5rem;

			image-rendering: pixelated;
		}
	`;
}
