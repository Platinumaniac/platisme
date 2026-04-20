import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("plat-project-page")
export class ProjectPageElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<p>hello</p>
		`;
	}
}
