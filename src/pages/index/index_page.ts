import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("plat-index-page")
export class PlatIndexElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<h1>index</h1>
		`
	}
}