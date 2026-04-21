import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("plat-redirect")
export class RedirectElement extends LitElement {
	@property({ type: String })
	public path: string;

	public constructor() {
		super();
		this.path = "";
	}

	protected render(): HTMLTemplateResult {
		location.href = this.path;
		return html``;
	}
}
