import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("plat-dropdown-button")
export class DropdownButton extends LitElement {

	@property({ type: String})
	public label: string;

	@state()
	private isOpen: boolean;

	public constructor() {
		super();

		this.label = "";
		this.isOpen = true;
	}

	private toggleOpen() {
		this.isOpen = !this.isOpen;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<button @click=${this.toggleOpen}>${this.label}</button>
			<div ?hidden=${!this.isOpen} class="dropdown-container">
				<div class="dropdown">
					<slot></slot>
				</div>
			</div>
		`;
	}
	
	static styles: CSSResultGroup = css`
		:host {
			display: flex;
			flex-direction: column;
		}
		.dropdown-container {
			position: relative;
		}
		.dropdown {
			position: absolute;
			z-index: 1;

			display: flex;
			flex-direction: column;
		}
	`;
}