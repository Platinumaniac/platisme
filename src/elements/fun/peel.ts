import { type Ref, ref, createRef } from 'lit/directives/ref.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { LitElement, html, type HTMLTemplateResult, type PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import { Vector2 } from "../../vectors";

@customElement("plat-peel")
export class Peel extends LitElement {
	mouseDelta: Vector2;

	resizeController: ResizeController;

	canvasRef: Ref<HTMLCanvasElement>

	context: CanvasRenderingContext2D | null;

	size: Vector2;
	foldPosition: Vector2;

	constructor() {
		super();

		this.mouseDelta = new Vector2;

		this.resizeController = new ResizeController(this,
			{
				target: this,
				callback: (entries: ResizeObserverEntry[]) => {this.onResize(entries)}
			}
		)
		
		this.canvasRef = createRef();

		this.context = null;

		this.size = new Vector2(1,1);
		this.foldPosition = new Vector2();

		window.addEventListener("mousemove", (event: MouseEvent) => {
			this.onMouseMove(event);
		});
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		let canvas: HTMLCanvasElement = this.canvasRef.value!;
		this.context = canvas.getContext("2d");

	}


	onResize(resizeEntries: ResizeObserverEntry[]) {
		if (resizeEntries.length > 0) {
			let canvas: HTMLCanvasElement = this.canvasRef.value!;
			canvas.width = resizeEntries[0].contentRect.width;
			canvas.height = resizeEntries[0].contentRect.height;
			
			this.size = new Vector2(canvas.width, canvas.height);

			this.foldPosition = new Vector2(canvas.width - 10, 10);
		}
	}

	onMouseMove(event: MouseEvent) {
		this.mouseDelta = new Vector2(event.movementX, event.movementY);
		this.foldPosition = this.foldPosition.add(this.mouseDelta);
		console.log(this.mouseDelta)
		this.context?.clearRect(0,0,9000,9000)
		this.context?.fillRect(this.size.x / 2, this.size.y / 2, 10, 10);

		this.context?.fillRect(this.foldPosition.x, this.foldPosition.y, 10, 10);
		

		this.context?.beginPath()
		this.context?.lineTo(this.size.x / 2, this.size.y / 2)
		this.context?.lineTo(event.offsetX, event.offsetY);
		this.context?.stroke();
		this.context?.closePath();


		let relAngle: number = this.mouseDelta.toAngle();

		this.context?.beginPath()
		this.context?.lineTo(this.foldPosition.x, this.foldPosition.y)
		this.context?.lineTo((Math.cos(relAngle) * 50) + this.foldPosition.x, (Math.sin(relAngle) * 50) + this.foldPosition.y);
		this.context?.stroke();
		this.context?.closePath();
	}

	protected render(): HTMLTemplateResult {
		return html`
			<div>
				<canvas ${ref(this.canvasRef)}>

				</canvas>
			</div>
		`;
	}


}