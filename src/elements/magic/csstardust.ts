import { css, html, LitElement, svg, unsafeCSS, type CSSResultGroup, type HTMLTemplateResult, type SVGTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import starStyles from "./stardust.css?inline";




@customElement("css-stardust")
export class CsStardust extends LitElement {

	generateStars(): SVGTemplateResult {
		return svg``
	}

	protected render(): HTMLTemplateResult {
		return html`
			<svg>
				<rect width="20" height="20" class="star" ></rect>
			</svg>
		`;
	}

	static styles?: CSSResultGroup = [
		unsafeCSS(starStyles),
		css`
			svg{
				width: 100%;
				height: 100%;
			}
		`];
}