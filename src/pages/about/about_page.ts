import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../elements/magic/speech_bubble"

@customElement("plat-about-page")
export class AboutPageElement extends LitElement {

	protected render(): HTMLTemplateResult {
		return html`
			<div class="about-container">
				<div class="title-container">
					<div class="name-container">
						<h1>PLAT</h1>
						<span>INUMANIAC</span>
					</div>
					<div class="them-goddamn-pronouns">any</div>
				</div>
				<div class="description-container">
					<span>
						holy moly
					</span>
				</div>
			</div>
			<img src="/src/assets/wizard_trans.png" alt="The Wizard" class="big-icon"/>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			display: grid;
			grid-template-columns: 60%;
			height: 100%;
		}

		.about-container {
			position: relative;

			background: var(--accent-color);

			clip-path: polygon(
				0% 0%,
				30% 0%,
				100% 30%,
				100% 60%,
				0% 100%

			);
		}

		.title-container {
			position: absolute;
			top: 10%;
			left: 40%;
			transform: rotate(22.5deg);

			display: flex;
			flex-direction: column;
		}

		.name-container {
			display: flex;
			align-items: center;
			height: max-content;
		}

		.name-container > h1 {
			margin: 0;

			font-size: 2.5rem;
		}
		.name-container > span {

			font-size: 1.75rem;
		}
		
		.description-container {
			position: absolute;
			top: 20%;
			left: 40%;
		}

		.big-icon {
			position: absolute;
			left: 55%;
			top: 50%;
			transform: translate(-50%, -50%);
			
			height: 50%;

			image-rendering: pixelated;
			
		}
	`;
}