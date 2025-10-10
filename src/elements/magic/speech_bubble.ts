import { Tween } from "@tweenjs/tween.js";
import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, type Ref, ref } from "lit/directives/ref.js";
import type { Tweenable } from "../../types";


@customElement("plat-bubble")
export class PlatBubbleElement extends LitElement {
	
	@property({type: String})
	public message: string;

	@state()
	private speechIndex: Tweenable;

	private speechTween: Tween;
	private audioContext: AudioContext;
	private speakerRef: Ref<HTMLMediaElement>;

	public constructor() {
		super();

		this.message = "";
		
		this.speechIndex = {value: 0};
		this.audioContext = new AudioContext();
		this.speakerRef = createRef();
		this.speechTween = new Tween(this.speechIndex);
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		const speaker: HTMLMediaElement = this.speakerRef.value!;

		const track = this.audioContext.createMediaElementSource(speaker);
		track.connect(this.audioContext.destination);

		this.speechTween
			.to({value: this.message.length})
			.onUpdate(() => {
				this.requestUpdate();
				
				speaker.play();
			})
			.start();
		
		requestAnimationFrame((time) => {this.tween(time)});

	}

	private tween(time: number) {
		this.speechTween.update(time);

		if (this.speechTween.isPlaying()) {
			requestAnimationFrame((time) => {this.tween(time)});
		}
		
	}

	protected render(): HTMLTemplateResult {
		return html`
			<audio ${ref(this.speakerRef)} src="/src/assets/sound/huh.mp3"></audio>
			<div>	
				${this.message.substring(0, Math.floor(this.speechIndex.value))}
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;
		}
	`;

}