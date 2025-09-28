import { css, html, LitElement, unsafeCSS, type CSSResultGroup, type HTMLTemplateResult} from "lit";
import { customElement } from "lit/decorators.js";
import "urlpattern-polyfill";
import starStyles from "../../dmcspin.css?inline";

@customElement("plat-index-page")
export class PlatIndexElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<div class="plat-jumpscare dmc-item-container">
				<img src="/src/assets/platsei.png" class="dmc-item"/>
				<div class="plat-jumpscare-title">
					<div>
						<span>PLAT</span>
						<span>IS</span>
						<span>ME</span>
					</div>
					<button>start</button>
				</div>
			</div>
		`;
	}

	static styles: CSSResultGroup = [
		unsafeCSS(starStyles),
		css`
			:host {
				display: flex;

				height: 100%;
				width: 100%;
			}

			.plat-jumpscare {
				flex: 1;

				background: black;
			}

			.dmc-item {
				animation-delay: 2s;
				animation-iteration-count: 1;

				image-rendering: pixelated;

				opacity: 0;
			}

			.plat-jumpscare-title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				font-size: 4rem;
			}
	`];
}