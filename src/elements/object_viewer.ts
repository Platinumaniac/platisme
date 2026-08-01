import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Euler, HemisphereLight, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

@customElement("plat-object-viewer")
export class ObjectViewerElement extends LitElement {
	@property({type: String})
	public objectPath: string;

	@property({ type: Boolean })
	public isControlled: boolean;

	private resizeController: ResizeController<Vector2>;
	private renderer: WebGLRenderer;
	private camera: PerspectiveCamera;
	private scene: Scene;
	private loader: GLTFLoader;
	private cameraControls?: OrbitControls;

	public constructor() {
		super();

		this.objectPath = "";
		this.isControlled = false;

		this.resizeController = new ResizeController(this, {
			callback: this.parseResize
		});

		this.renderer = new WebGLRenderer();
		this.renderer.setClearColor( 0x000000, 0);
		this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);
		this.camera.position.z = 9.5;
		this.scene = new Scene();
		const skyColor = 0x9dbfdff;
		const groundColor = 0xffc278;
		const intensity = 5;
		const light = new HemisphereLight(skyColor, groundColor, intensity);
		this.scene.add(light);
		this.loader = new GLTFLoader();

	}

	public firstUpdated(_changedProperties: PropertyValues): void {
		this.loader.load(this.objectPath, (gltf) => {
			this.scene.add(gltf.scene);
			gltf.scene.children[0].setRotationFromEuler(new Euler(Math.PI / 7, -Math.PI / 3.5, Math.PI / 4));
		}, undefined,  console.error);
		this.processFrame(0);

		if (this.isControlled) {
			this.cameraControls = new OrbitControls(this.camera, this);
			this.cameraControls.enableZoom = false;
		}
	}

	private parseResize(entries: ResizeObserverEntry[]): Vector2 {
		if (entries.length > 0) {
			return new Vector2(
				entries[0].contentRect.width,
				entries[0].contentRect.height
			);
		}

		return new Vector2();
	}

	private processFrame(delta: number): void {
		this.requestUpdate();
		this.cameraControls?.update(delta);
		requestAnimationFrame((delta) => { this.processFrame(delta); });
	}


	public render(): HTMLTemplateResult {
		if (this.resizeController.value !== undefined && this.resizeController.value !== null) {
			this.camera.aspect = this.resizeController.value.width / this.resizeController.value.height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.resizeController.value.width, this.resizeController.value.height);
		}

		this.renderer.render(this.scene, this.camera);

		return html`
			<div>
				${this.renderer.domElement}
			</div>
		`;
	}

	static styles: CSSResultGroup = css`
		canvas {
			clip-path: border-box;

		}
	`;
}
