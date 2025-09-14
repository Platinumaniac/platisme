import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("plat-template-entry")
export class Baller extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<h1>HELLO</h1>
		`;
	}
}