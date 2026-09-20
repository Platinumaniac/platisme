import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult} from "lit";
import { customElement } from "lit/decorators.js";
import type { MainPageData } from "../lib/types";
import { map } from "lit/directives/map.js";

@customElement("plat-navbar")
export class NavbarElement extends LitElement {
	private pages: MainPageData[];

	public constructor() {
		super();

		this.pages = [
			{
				name: "HOME",
				color: "#439ad0",
				href: "/",
				regex: /^\/$/,
			},
			{
				name: "PROJECTS",
				color: "#c94059",
				href: "/projects/menu",
				regex: /^\/projects/,
			},
		];
	}

	protected render(): HTMLTemplateResult {

		return html`
			<div class="fill left" part="fill"></div>
			<nav>
				${map(this.pages, (page => {
					const isCurrent = this.matchesPath(page.regex);

					return html`
						<a
							href=${page.href}
							?current=${isCurrent}
							style="--button-color: ${page.color};"
							part="nav-link ${isCurrent ? 'current' : ''}"
							>${page.name}</a>
					`;
					}))}
			</nav>
			<div class="fill right" part="fill"></div>
		`;
	}

	private matchesPath(path: RegExp): boolean {
		return path.exec(window.location.pathname) !== null;
	}

	static styles: CSSResultGroup = css`
		:host {
			display: grid;
			grid-template-columns: 1fr 2fr 30fr;
			gap: .5rem;
		}

		nav {
			display: flex;
			gap: .5rem;
		}

		.fill {
			width: 100%;
			margin-bottom: .5rem;

			background: var(--background-color-dark);
			box-shadow: 0 .5rem var(--background-color-darker);
		}
		.fill.right {
			border-radius: .4rem 0 0 .4rem;

		}
		.fill.left {
			border-radius: 0 .4rem .4rem 0;
		}

		a {
			transition: background-position .2s, margin .2s, box-shadow .2s;

			--button-color: #439ad0;

			position: relative;

			box-sizing: border-box;

			padding: .75rem;
			border: solid .2rem transparent;
			border-radius: .4rem;
			margin-bottom: .5rem;

			display: flex;
			align-content: center;
			justify-content: center;

			font-size: 1.2rem;
			line-height: 100%;
			font-weight: 900;
			font-family: "Atkinson Hyperlegible Next";
			text-align: center;
			text-decoration: none;
			text-baseline: middle;
			color: white;
			-webkit-text-stroke: .2rem black;
			paint-order: stroke fill;

			background:
				border-box linear-gradient(50deg,
					#ffffff80 30%,
					transparent 30%,
					transparent 35%,
					#ffffff80 35%,
					#ffffff80 45%,
					transparent 45%,
					transparent 70%,
					#ffffff80 70%,
					#ffffff80 75%,
					transparent 75%
				),
				padding-box linear-gradient(var(--button-color)),
				border-box linear-gradient(color-mix(in oklch, var(--button-color), #fff 50%));
			background-position: -20px 0;
			background-size: 130%;
			box-shadow: 0 .5rem color-mix(in oklch, var(--button-color), #0000a0 20%);

			cursor: pointer;
		}
		a:hover {
			transition: background-position .2s, margin .2s, box-shadow .2s;

			box-shadow: 0 .5rem color-mix(in oklch, var(--button-color), #0000a0 20%);
			margin-bottom: .5rem;


			background-position: -10px 0;
		}
		a:hover {
			transition: background-position .2s, margin .2s, box-shadow .2s;

			box-shadow: 0 0 color-mix(in oklch, var(--button-color), #0000a0 20%);
			margin-top: .5rem;
			margin-bottom: 0;

			background-position: 0px 0;
		}
		a[current] {
			transition: background-position .2s, margin .2s, box-shadow .2s;

			box-shadow: 0 0 color-mix(in oklch, var(--button-color), #0000a0 20%);
			margin-top: .5rem;
			margin-bottom: 0;

			background-position: 0px 0;
		}
	`;
}
