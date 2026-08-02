import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import wizardImageUrl from "/src/assets/index/wizard/wizard.png";

@customElement("plat-wizard")
export class WizardElement extends LitElement {

	protected render(): HTMLTemplateResult {
		return html`
			<img src=${wizardImageUrl} alt="THE WIZARD!!!" draggable="false"/>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			padding: 3rem;

			display: block;
		}

		img {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			box-sizing: border-box;
			width: 100%;


			image-rendering: pixelated;

			user-select: none;
			cursor: pointer;
		}

		@keyframes ascend {
			0% {
				filter: contrast(100%) brightness(100%);
			}

			70% {
				transform: translate(-50%, -50%);
			}

			80% {
				top: 5rem;

				transform:
					translate(-50%, -50%) scale(1.5, .7)
				;

				filter: contrast(0) brightness(600%);

				opacity: 1;
			}

			100% {
				top: -50rem;

				transform:
					translate(-50%, -50%) scale(.2, 1.5)
				;
				filter: contrast(0) brightness(600%);

				opacity: 0;
			}
		}
	`;
}
