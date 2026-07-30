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
				<h1>Plat Icon Package Editor</h1>
				<h2>What is PIPE?</h2>
				<p>
					PIPE is a tool I thought writing JSON for my icon theme was annoying. It started out as a small and admittedly bad web application, but eventually i didn't feel like maintaining a web app anymore so i ported it to rust. This took quite a while as it is the first GUI application i have made using rust and I suffer from laziness.
				</p>
				<h2>What does PIPE do?</h2>
				<p>
					PIPE allows for importing a tileset, defining icons from said tileset and exporting it to a proper format for use in an IDE. As of now it only supports VSCode, but exporting to zed is in the works.
				</p>
				<div id="links">
					<plat-social-link href="https://codeberg.org/platinumaniac/rusty_pipe" site="codeberg"></plat-social-link>
				</div>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			box-sizing: border-box;
			height: 100%;
			padding: 2rem;

			display: flex;
			align-items: center;


		}
		plat-object-viewer {
			position: absolute;
			left: 30%;
			top: 50%;

			width: 35%;
			aspect-ratio: 1;
			border: solid 2rem var(--background-color-dark);
			border-radius: 50%;

			display: block;

			background: var(--background-color);

			transform: translate(-50%, -50%);
		}

		#info {
			box-sizing: border-box;
			padding: 1rem;
			padding-left: 25%;
			border-radius: 1rem;
			margin-left: 30%;

			background: var(--background-color-dark);
		}
	`;
}
