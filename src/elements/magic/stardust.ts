import { css, html, LitElement, svg, unsafeCSS, type CSSResultGroup, type HTMLTemplateResult, type SVGTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import starStyles from "./stardust.css?inline";
import { styleMap } from "lit/directives/style-map.js";
import { Vector2 } from "../../vectors";


@customElement("plat-stardust")
export class StardustElement extends LitElement {

	@property({type: String})
	imagePath: string;

	constructor() {
		super();
		this.imagePath = "";
	}


	generateTrail(amount: number, delay: number = .1, angle: number = Math.PI / 4, origin: Vector2): SVGTemplateResult {

		let stars: SVGTemplateResult[] = [];

		for (let index = 0; index < amount; index ++) {

			const styles = {
				"--delay": `${index * delay}s`,
				"--angle": angle,
				"--duration": "8s",
				"--speed": 9,
				"--origin-x": `${origin.x}px`,
				"--origin-y": `${origin.y}px`
			}

			stars.push(
				svg`<image width="64" height="64" href=${this.imagePath} class="star" style=${styleMap(styles)}></image>`
			);
		}

		return svg`
		${stars}`;
	}

	protected render(): HTMLTemplateResult {
		return html`
			<svg>
				${this.generateTrail(20, .1, Math.PI / 2, new Vector2())}
				${this.generateTrail(20, .1, Math.PI / 4, new Vector2())}
				${this.generateTrail(10, .1, 0, new Vector2())}
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
			svg{
				width: 100%;
				height: 100%;
			}
		`];
}