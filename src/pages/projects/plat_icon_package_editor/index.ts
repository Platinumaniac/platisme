import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../elements/object_viewer";
import "../../../elements/social_link";

@customElement("pipe-project")
export class PIPEElement extends LitElement {
	protected render(): HTMLTemplateResult {

		return html`
			<plat-navbar></plat-navbar>
			<plat-object-viewer objectPath="/src/assets/models/pipe_case_outlined.glb"></plat-object-viewer>
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
				<h2>Where do i find PIPE?</h2>
				<div id="links">
					<plat-social-link href="https://codeberg.org/platinumaniac/rusty_pipe" site="codeberg"></plat-social-link>
				</div>
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			--accent-color: #c94059;
			--accent-color-light: #d86d80;
			--background-color: #1b1b1b;
			--background-color-light: #5b5b5b;

			position: relative;

			box-sizing: border-box;
			height: 100%;

			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: max-content auto;
			grid-template-areas: "nav nav" "view info";
			gap: .15rem;

			background: var(--background-color-light);
		}
		plat-navbar {
			box-sizing: border-box;
			padding: .5rem;
			padding-left: 2rem;

			grid-area: nav;

			background: var(--background-color);
		}
		plat-navbar::part(nav-link) {
			border: .1rem solid var(--background-color-light);
			margin: 0;

			background: var(--background-color);


			box-shadow: none;
		}
		plat-navbar::part(nav-link current) {
			border: .2rem solid var(--accent-color-light);
			margin: 0;

			background: var(--accent-color);

			box-shadow: none;
		}
		plat-navbar::part(fill) {
			display: none;
		}

		plat-object-viewer {
			box-sizing: border-box;
			min-width: 0;
			min-height: 0;

			background: var(--background-color);
		}
		#info {
			box-sizing: border-box;
			padding: 1rem;
			width: 100%;

			background: var(--background-color);
		}
	`;
}
