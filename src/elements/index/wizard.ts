import { LitElement } from "lit";
import { state } from "lit/decorators.js";

export class WizardElement extends LitElement {
	@state()
	private lines: string[];
	@state()
	private lineIndex: number;

	public constructor() {
		super();

		this.lines = [];
		this.lineIndex = 0;
	}
}
