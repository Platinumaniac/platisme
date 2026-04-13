import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import { StuffPageDataSchema, type StuffPageData } from "../../types";
import { map } from "lit/directives/map.js";

// stuff may be foun here
@customElement("plat-stuff-page")
export class StuffPageElement extends LitElement {

	@state()
	private offset: number;

	@state()
	private isDragging: boolean;

	@query("#wrapper")
	private wrapper?: HTMLDivElement;

	private stuffPages: StuffPageData[];

	protected constructor() {
		super();

		this.offset = 0;
		this.isDragging = false;
		this.lastScroll = 0;

		this.stuffPages = [
			StuffPageDataSchema.parse({
				iconPath: "/src/assets/stuff/icon_template.png",
				id: "#"
			}
			),
			StuffPageDataSchema.parse({
				iconPath: "/src/assets/stuff/icon_template.png",
				id: "#"
			}
			),
			StuffPageDataSchema.parse({
				iconPath: "/src/assets/stuff/icon_template.png",
				id: "#"
			}
			),
		];


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
		CSS.registerProperty(
			{
				name: "--point-count",
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
			this.offset += event.movementX / 250;
		}
	}

	private handleScrollWheel(event: WheelEvent) {
		this.offset += event.deltaY / 1000;
	}

	protected render(): HTMLTemplateResult {
		const circleStyle: StyleInfo = {
			"--angle-offset": this.offset
		};

		if (!CSS.supports("opacity", "sibling-count()")) {
			circleStyle["--point-count"] = this.stuffPages.length;
		}

		return html`
			<div id="wrapper"
				@mousedown=${this.handleMouseDown}
				@mouseup=${this.handleMouseUp}
				@mousemove=${this.handleMouseMove}
				@wheel=${this.handleScrollWheel}
			>
				<div id="circle" style=${styleMap(circleStyle)}>
					${map(this.stuffPages.entries(), ([index, page]) => {
						let iconUrl = new URL(page.iconPath, import.meta.url).href;
						let pointStyle: StyleInfo = {};

						if (!CSS.supports("opacity", "sibling-index()")) {
							pointStyle["--sibling-index"] = index + 1;
						};

						return html`
						<a class="point" href="/stuff/${page.id}" style=${styleMap(pointStyle)}>
							<img src=${iconUrl} draggable="false"/>
						</a>
						`;
					})}
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

			cursor: grab;

			background:
				linear-gradient(20deg, transparent, var(--primary-color));
		}

		#circle {
			position: relative;
		}

		.point {
			/*fallback for browsers that lack support for sibling-count() and sibling-index() */
			--sibling-index: 0;
			--radius: calc(min(40dvh, 40dvw));
			--angle-increment: calc(PI * 2 / var(--point-count));
			--angle: calc(-1 * (var(--sibling-index) - 1) * var(--angle-increment) + PI / 2 - var(--angle-offset));

			position: absolute;
			top: calc(sin(var(--angle) - cos(var(--angle)) / 2) * var(--radius) / 3);
			left: calc((cos(var(--angle) - cos(var(--angle)) / 2) * var(--radius)));
			z-index: calc(((sin(var(--angle)) + 1) / 2) * 100);
			transform: translate(-50%, -50%);

			width: calc((sin(var(--angle)) + 2) / 2 * 6rem);
			aspect-ratio: 1;

			user-select: none;
		}
		.point > img {
			width: 100%;

			image-rendering: pixelated;
		}

		@supports(opacity: sibling-index()) {
			.point {
				--sibling-index: sibling-index();
			}
		}
		@supports(opacity: sibling-count()) {
			.point {
				--point-count: sibling-count();
			}
		}
	`;
}
