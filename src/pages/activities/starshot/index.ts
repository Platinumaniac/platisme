import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, type Ref, ref } from "lit/directives/ref.js";
import type { StardustElement } from "../../../elements/magic/stardust";
import { Vector2 } from "../../../vectors";


@customElement("plat-starshot-page")
export class StarshotPageElement extends LitElement {

	private stardustRef: Ref<StardustElement>;
	private starStart: Vector2;

	public constructor() {
		super();

		this.stardustRef = createRef();
		this.starStart = new Vector2();
		
	}


	private handleMouseDown(event: MouseEvent) {
		this.starStart = new Vector2(event.layerX, event.layerY);
	}

	private handleMouseUp(event: MouseEvent) {
		const stardust: StardustElement = this.stardustRef.value!;

		let starAngle: number = new Vector2(event.layerX, event.layerY)
			.sub(this.starStart)
			.toAngle();
		
		stardust.addTrail(
			10,
			.1,
			starAngle,
			this.starStart
		);
	}

	protected render(): HTMLTemplateResult {
		return html`
			<plat-stardust
				${ref(this.stardustRef)}
				@mousedown=${(event: MouseEvent) => {this.handleMouseDown(event)}}
				@mouseup=${(event: MouseEvent) => {this.handleMouseUp(event)}}
				
				imagePath="/src/assets/magic/star_purple_big.png"
			></plat-stardust>
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			height: 100%;

			display: block;
		}

		plat-stardust{
			height: 100%;
		}
	`;
}