import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../elements/magic/starhail";
import "../../elements/index/info";
import "../../elements/index/wizard";


@customElement("plat-index-page")
export class IndexPageElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<plat-navbar></plat-navbar>
			<div id="content">
				<plat-info></plat-info>
				<plat-wizard></plat-wizard>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			height: 100%;

			display: grid;
			grid-template-rows: max-content auto;
		}

		#content {
			box-sizing: border-box;
			height: 100%;
			padding: 2rem;

			display: grid;
			grid-template-columns: 1fr 1fr 2fr;
			grid-template-rows: 1fr 1fr;
			grid-template-areas: "info check wizard" "news news wizard";
			gap: 2rem;
		}

		plat-info {
			grid-area: info;
		}

		plat-wizard {
			grid-area: wizard;
		}
	`;
}
