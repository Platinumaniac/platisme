import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("plat-dropdown-button")
export class DropdownButton extends LitElement {

	@state()
	private isOpen: boolean;

	public constructor() {
		super();

		this.isOpen = true;
	}

	private toggleOpen() {
		this.isOpen = !this.isOpen;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<button @click=${this.toggleOpen}>
				<slot name="button"></slot>
			</button>
			<div ?hidden=${!this.isOpen} class="dropdown-container">
				<div class="dropdown">
					<slot name="content"></slot>
				</div>
			</div>
		`;
	}
	
	static styles: CSSResultGroup = css`
		:host {
			display: flex;
			flex-direction: column;
		}

		button {
			height: 100%;
			width: 100%;

			background: var(--accent-color);

			border: none;

			cursor: pointer;
		}

		button:hover {
			background: var(--accent-color-light);
		}

		.dropdown-container {
			position: relative;
		}
		.dropdown {
			position: absolute;
			z-index: 1;

			min-width: 100%;

			display: flex;
			flex-direction: column;
			
		}
	`;
}