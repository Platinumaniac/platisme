import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("plat-auto-redirect")
export class AutoRedirect extends LitElement {
	
	@property({type: String})
	path: string;

	constructor() {
		super();
		this.path = "";
	}

	connectedCallback(): void {
		window.location.href = this.path;
	}

}