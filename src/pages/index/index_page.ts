import { html, LitElement, unsafeCSS, type CSSResultGroup, type HTMLTemplateResult} from "lit";
import { customElement } from "lit/decorators.js";
import "urlpattern-polyfill";
import indexStyles from "./index.css?inline";
import "../../elements/magic/stardust";

@customElement("plat-index-page")
export class IndexElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<div id="page">
				<div>news</div>
				<div class="nav">
					<div>about</div>
					<div>blog</div>
					<div>gallery</div>
				</div>
				<div id="frame-container">
					<div class="frame">
						
						<img src="/src/assets/frames/fan_frame.png" draggable="false"/>
						<div class="frame-content">
							<img class="content" src="/src/assets/biggest_fan.jpg"/>
						</div>
					</div>
					<div class="frame">
						<img src="/src/assets/frames/hater_frame.png" draggable="false"/>
						<div class="frame-content">
							<img class="content" src="/src/assets/biggest_hater.jpg"/>
						</div>
					</div>
				</div>
				<plat-stardust imagePath="/src/assets/magic/star_purple_big.png" ></plat-stardust>
			</div>
		`;
	}

	static styles: CSSResultGroup = [
		unsafeCSS(indexStyles)
	];
}