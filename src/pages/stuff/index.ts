import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";

// stuff may be foun here
@customElement("plat-stuff-page")
export class StuffPageElement extends LitElement {

	@state()
	private offset: number;

	@state()
	private isDragging: boolean;

	@query("#wrapper")
	private wrapper?: HTMLDivElement

	protected constructor() {
		super();

		this.offset = 0;
		this.isDragging = false;
		this.lastScroll = 0;


	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		CSS.registerProperty(
			{
				name: "--angle-offset",
				syntax: "<number>",
				inherits: true,
				initialValue: "0",
			}
		);
}

	private handleMouseDown(_event: MouseEvent) {
		this.isDragging = true;
	}

	private handleMouseUp(_event: MouseEvent) {
		this.isDragging = false;
	}

	private handleMouseMove(event: MouseEvent) {
		if (this.isDragging) {
			this.offset += event.movementX;
		}
	}

	private handleScrollWheel(event: WheelEvent) {
		this.offset += event.deltaY * .5;
	}

	protected render(): HTMLTemplateResult {
		const circleStyle: StyleInfo = {
			"--angle-offset": `${this.offset / 500}`
		}

		return html`
			<div id="wrapper"
				@mousedown=${this.handleMouseDown}
				@mouseup=${this.handleMouseUp}
				@mousemove=${this.handleMouseMove}
				@wheel=${this.handleScrollWheel}
			>
				<div id="circle" style=${styleMap(circleStyle)}>
					<button class="point"></button>
					<button class="point"></button>
					<button class="point"></button>
					<button class="point"></button>
					<button class="point"></button>
				</div>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		#wrapper {
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		#circle {
			position: relative;
		}

		.point:first-child {
			background: red;
		}

		.point {
			--radius: calc(min(40dvh, 40dvw));
			--angle-increment: calc(PI * 2 / sibling-count());
			--angle: calc((-1 * (sibling-index() - 1) * var(--angle-increment) + PI / 2) - var(--angle-offset));

			position: absolute;
			top: calc(sin(var(--angle)) * var(--radius) / 3.25);
			left: calc(cos(var(--angle)) * var(--radius));

			transform: translate(-50%, -50%);

			width: calc((sin(var(--angle)) + 1.5) / 2 * 7.5rem);
			aspect-ratio: 1;

			border: none;
			border-radius: 50%;

			background-color: var(--accent-color);
		}
	`;
}
