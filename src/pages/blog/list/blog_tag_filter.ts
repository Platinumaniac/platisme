import { html, LitElement, type HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("plat-tag-filter")
export class TagFilterElement extends LitElement {

	@property({type: String})
	public tag: string;

	public constructor() {
		super();
		
		this.tag = "";
	}

	private onRemovePressed() {
		const removeEvent: CustomEvent = new CustomEvent("removePressed");
		this.dispatchEvent(removeEvent);
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div>
				<div>${this.tag}</div>
				<button @click=${this.onRemovePressed}>x</button>
			</div>
		`;
	}
}