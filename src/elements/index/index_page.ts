import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";


customElement("plat-index-page")
export class IndexPage extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<h1>HELLO CITIZEN</h1>
		`;
	}

}