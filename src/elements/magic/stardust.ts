import { css, html, LitElement, svg, unsafeCSS, type CSSResultGroup, type HTMLTemplateResult, type SVGTemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import starStyles from "./stardust.css?inline";
import { styleMap } from "lit/directives/style-map.js";
import { Vector2 } from "../../vectors";


@customElement("plat-stardust")
export class StardustElement extends LitElement {

	@property({type: String})
	public imagePath: string;

	@state()
	private trails: SVGTemplateResult[];

	public constructor() {
		super();
		this.imagePath = "";
		this.trails = [];
		document.adoptedStyleSheets.push()
		this.addTrail(20, .1, Math.PI / 2, new Vector2());
	}


	public addTrail(amount: number, delay: number = .1, angle: number = Math.PI / 4, origin: Vector2) {

		let stars: SVGTemplateResult[] = [];

		for (let index = 0; index < amount; index ++) {

			const styles = {
				"--delay": `${index * delay}s`,
				"--angle": angle,
				"--duration": "8s",
				"--speed": 4,
				"--origin-x": `${origin.x}px`,
				"--origin-y": `${origin.y}px`
			}

			stars.push(
				svg`<image width="64" height="64" href=${this.imagePath} class="star" style=${styleMap(styles)}></image>`
			);
		}

		this.trails = [...this.trails, svg`
				<g>
					${stars}
				</g>
		`];
	}

	protected render(): HTMLTemplateResult {
		return html`
			<svg>
				${this.trails}
			</svg>
		`;
	}

	static {
		const documentStyles: CSSResultGroup = css`
			@property --progress {
				syntax: "<number>";
				initial-value: 0;
				inherits: false;
			}

			@property --amplitude {
				syntax: "<length>";
				initial-value: 60px;
				inherits: false;
			}

			@property --origin-x {
				syntax: "<length>";
				initial-value: 0;
				inherits: false;
			}

			@property --origin-y {
				syntax: "<length";
				initial-value: 0;
				inherits: false;
			}

			@property --size-falloff {
				syntax: "number";
				initial-value: 0;
				inherits: false;
			}`;
			document.adoptedStyleSheets.push(documentStyles.styleSheet!);
	}

	static styles: CSSResultGroup = [
		unsafeCSS(starStyles),
		css`
			:host {
				display: block;

				width: 100%;
				height: 100%;
			}

			svg{
				width: 100%;
				height: 100%;
			}
		`];
}
