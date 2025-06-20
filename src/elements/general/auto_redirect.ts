import { LitElement, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("plat-redirect")
export class AutoRedirect extends LitElement {

	@property()
	path: string;

	constructor() {
		super();

		this.path = "";
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		window.location.href = this.path;
	}
}