import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import WizardIconUrl from "../../assets/wizard_trans.png?url";
import { customElement, state } from "lit/decorators.js";
import SpeechBubbleUrl from "../../assets/speech_bubble.png";
@customElement("plat-wizard")
export class WizardElement extends LitElement {

	@state()
	private isTalking: boolean;
	@state()
	private bubbleText: string;
	@state()
	private lineIndex: number;

	private wizardLines: string[];


	public constructor() {
		super();

		this.isTalking = false;
		this.bubbleText = "";
		this.lineIndex = 0;
		this.wizardLines = [
			"Hello, I am the very awesome wizard",
			"I am so evil that i like software development",
			"my dialogue is exhausted now"
		];
	}

	/**
	* makes the wizard say stuff, do misuse <|:3c
	*/
	private async say(phrase: string) {
		if (this.isTalking) {
			return;
		}

		this.isTalking = true;
		for (let i = 0; i <= phrase.length; i++) {
			this.bubbleText = phrase.slice(0, i);
			await this.sleep(100);
		}
		this.isTalking = false;
	}

	private async sayNext() {
		if (this.lineIndex < this.wizardLines.length && !this.isTalking) {
			await this.say(this.wizardLines[this.lineIndex]);
			this.lineIndex++;
		}
	}

	private async sleep(time: number) {
		return new Promise(resolve => setTimeout(resolve, time));
	}

	protected render(): HTMLTemplateResult {
		return html`
				<div id="wizard-container">

					<img id="wizard-sprite" src=${WizardIconUrl} ?data-talking=${this.isTalking} @click=${() => { this.sayNext(); }} draggable=false>
					<span id="speech-bubble" style="--speech-bubble-border: url(${SpeechBubbleUrl});">${this.bubbleText}</span>
				</div>
			`;
	}


	static styles: CSSResultGroup = css`
			:host {
				position: relative;

				width: 100%;
				height: 100%;

				display: flex;
				align-items: center;
			}

			#wizard-container {
				position: relative;

				width: 100%;
			}

			#speech-bubble {
				--speech-bubble-border: url(/src/assets/speech_bubble.png);

				position: absolute;
				bottom: 90%;
				right: 45%;

				padding: 1rem;

				color: black;

				border-image: var(--speech-bubble-border) 10 fill / 40px / 20px;
				image-rendering: pixelated;
			}

			#wizard-sprite {
				transition: transform .2s;

				width: 100%;

				image-rendering: pixelated;

				user-drag: none;
				user-select: none;
				cursor: pointer;
			}

			#wizard-sprite:hover {
				transition: transform .2s;
				transform: rotatey(20deg);
			}

			#wizard-sprite[data-talking] {
				cursor: wait;
				animation: .3s wizard-talk infinite;
			}

			@keyframes wizard-talk {
				0% {
					transform: rotatex(20deg);
				}
				50% {
					transform: rotatey(-20deg);
				}
				100% {
					transform: rotatex(0deg);
				}
			}
		`;
}
