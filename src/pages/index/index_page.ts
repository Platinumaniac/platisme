import { css, html, LitElement, unsafeCSS, type CSSResultGroup, type HTMLTemplateResult} from "lit";
import { customElement } from "lit/decorators.js";
import "urlpattern-polyfill";
import starStyles from "../../dmcspin.css?inline";

@customElement("plat-index-page")
export class IndexElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`

		`;
	}

	static styles: CSSResultGroup = [
		unsafeCSS(starStyles),
		css`

	`];
}