import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../elements/object_viewer";
import "../../../elements/social_link";

@customElement("pipe-project")
export class PIPEElement extends LitElement {
	protected render(): HTMLTemplateResult {
		return html`
			<plat-object-viewer objectPath="/src/assets/models/pipe_case.glb"></plat-object-viewer>
			<div id="info">
				<h1>PIPE</h1>
				<plat-social-link href="https://codeberg.org/platinumaniac/rusty_pipe" site="codeberg"></plat-social-link>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			box-sizing: border-box;
			height: 100%;
			padding-top: 4rem;

			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		plat-object-viewer {
			aspect-ratio: 1;
			clip-path: circle(50%);
		}
	`;
}
