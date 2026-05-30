import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import { randomRange } from "../../lib/random";
@customElement("plat-starhail")
export class StarhailElement extends LitElement {

	@property({ type: Number })
	public starCount: number;

	@property({ type: Number })
	public direction: number;

	@property({ type: Number })
	public spread: number;

	public constructor() {
		super();

		this.starCount = 100;
		this.direction = Math.PI / 6;
		this.spread = Math.PI / 4;
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		CSS.registerProperty(
			{
				name: "--progress",
				syntax: "<number>",
				inherits: false,
				initialValue: "0",
			}
		);
	}

	private generateStarStyleInfo(): StyleInfo {
		return {
			"--angle": randomRange(this.direction - this.spread, this.direction + this.spread),
			"--delay": `${randomRange(0, 5)}s`,
			"--amplitude": randomRange(0, 10),
		};
	}


	protected render(): HTMLTemplateResult {
		return html`
			${map(range(this.starCount), () => html`
				<div
					class="star"
					style=${styleMap(this.generateStarStyleInfo())}
				></div>
			`)}
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			display: block;
			width: 100%;
			height: 100%;

			overflow: hidden;
		}

		.star {
			--size: 3rem;
			--amplitude: 2;
			--wavelength: 10;
			--canvas-scale: calc(max(1dvw, 1dvh));
			--angle: calc(PI / 6);
			--delay: 0s;

			position: absolute;
			left: calc(
				(
				/* movement */
				cos(var(--angle)) * var(--progress)

				/* wave */
				- sin(var(--progress) / var(--wavelength)) * var(--amplitude)
				) * var(--canvas-scale)
			);
			top: calc(
				(
				sin(var(--angle)) * var(--progress)

				+ cos(var(--progress) / var(--wavelength)) * var(--amplitude)
				)
				* var(--canvas-scale)
			);


			aspect-ratio: 1;
			width: var(--size);
			background: url(/src/assets/magic/star.png) calc(var(--size) * 4) / calc(var(--size) * 4);
			image-rendering: pixelated;



			animation:
				spin .4s infinite steps(4),
				hail 5s var(--delay) infinite linear;
		}

		@keyframes spin {
			from {
				background-position: 0 0;
			}

			to {
				background-position: calc(var(--size) * -4) 0;
			}
		}

		@keyframes hail {
			from {
				--progress: 0;
			}

			to {
				--progress: 100;
			}
		}

	`;
}
