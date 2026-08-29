import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import wizardImageUrl from "/src/assets/index/wizard/wizard.png";

@customElement("plat-wizard")
export class WizardElement extends LitElement {
	@state()
	private speechBuffer: string;

	@state()
	private speechIndex: number;

	@state()
	private isSpeaking: boolean;

	private speechQueue: string[];

	@query("#wizard")
	private wizardSprite?: HTMLImageElement;

	public constructor() {
		super();

		this.speechBuffer = "";
		this.speechIndex = 0;
		this.isSpeaking = false;

		this.speechQueue = [
			"I AM WIZARD",
			"Welcome to the plat website",
			"It might be small for now, but I'll update it eventually",
			"<|:3",
			"My dialogue is exhausted, I must vanish now"
		];
	}


	private async queueLine(): Promise<void> {
		if (this.wizardSprite === undefined || this.wizardSprite === null) {
			return;
		}

		if (this.speechIndex < this.speechQueue.length) {
			if (!this.isSpeaking) {
				await this.say(this.speechQueue[this.speechIndex]);
				this.speechIndex++;
			}
		} else {
			this.speechBuffer = "";

			this.wizardSprite.toggleAttribute("ascending");
		}
	}

	private async say(phrase: string): Promise<void> {
		if (this.isSpeaking) {
			return;
		}

		this.isSpeaking = true;
		for (let i = 0; i <= phrase.length; i++) {
			this.speechBuffer = phrase.slice(0, i);
			await this.sleep(100);
		}
		this.isSpeaking = false;
	}


	private async sleep(time: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, time));
	}

	protected render(): HTMLTemplateResult {
		return html`
			<img id="wizard" src=${wizardImageUrl} alt="THE WIZARD!!!" draggable="false" @click=${this.queueLine}/>
			<div id="bubble" ?hidden=${this.speechBuffer === ""}>${this.speechBuffer}</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			aspect-ratio: 1;
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
		img[ascending] {
			animation: ascend 2s forwards;
		}

		#bubble {
			position: absolute;
			top: 4rem;
			right: 40%;

			padding: 1rem;
			border-radius: 1rem;

			background: white;
			color: black;
		}

		#bubble::after {
			content: "";

			position: absolute;
			bottom: -.5rem;
			right: -.5rem;

			width: 1.5rem;
			height: 1.5rem;

			font-size: 1.2rem;

			clip-path: polygon(0 0, 60% 0, 100% 100%, 0 60%);

			background: white;

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
