import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../elements/projects/project_entry.ts";
import { BoxGeometry, Camera, Euler, Mesh, MeshNormalMaterial, Object3D, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three/src/Three.js";
import { Task } from "@lit/task";
import type { ProjectEntry } from "../../types.ts";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import { Group, Tween } from "@tweenjs/tween.js";

@customElement("plat-project-page")
export class ProjectPageElement extends LitElement {

	private projectTask: Task<[], ProjectEntry[]>;
	private resizeController: ResizeController<Vector2>;
	private renderer: WebGLRenderer;
	private camera: Camera;
	private scene: Scene;
	@state()
	private projectMeshes: Object3D[];
	private selectedProjectIndex?: number;
	private selectionTweenGroup: Group

	public constructor() {
		super();

		this.projectTask = new Task(this, {
			task: async () => {
				return (await import("./project_index.ts")).default;
			},
			args: () => []
		});

		this.resizeController = new ResizeController(this, {
			callback: this.parseResize
		});

		this.scene = new Scene();
		this.projectMeshes = [];
		this.selectionTweenGroup = new Group();

		this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

		this.camera.position.z = 1;
		this.camera.position.y = .6;
		this.camera.rotateX(-(Math.PI / 5));
		this.renderer = new WebGLRenderer();

		this.updateTweens(0);
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

	private loadProjectMeshes(projects: ProjectEntry[]): Object3D[] {
		let meshes: Object3D[] = [];

		for (const [index, project] of projects.entries()) {
			const geometry = new BoxGeometry(.08, .64, .32);
			const material = new MeshNormalMaterial();
			const mesh = new Mesh(geometry, material);
			mesh.position.x = index * .09;
			this.scene.add(mesh);

			meshes.push(mesh);
		}

		return meshes;
	}

	private handleClick(event: PointerEvent) {
		const canvasWidth = this.resizeController.value!.width;
		const canvasHeight = this.resizeController.value!.height;
		const raycast = new Raycaster();
		raycast.setFromCamera(new Vector2(
			( event.offsetX / canvasWidth ) * 2 - 1,
			 - (event.offsetY / canvasHeight) * 2 + 1),
			this.camera);

		for (const [index, projectMesh] of this.projectMeshes.entries()) {
			if (raycast.intersectObject(projectMesh).length > 0) {
				this.selectProject(index);
			}

		}
	}

	private selectProject(index: number) {
		const isDeselecting = this.selectedProjectIndex !== undefined;

		const selectTween = new Tween([
			this.projectMeshes[index].position,
			this.projectMeshes[index].rotation
		]).to([
			new Vector3(0, .15, .4),
			{
				x: Math.PI / 5,
				y: Math.PI / 3,
				z: -Math.PI / 4,
			}
		], 250)
			.onUpdate(() => {
				this.projectMeshes = [...this.projectMeshes];
		});

		if (!isDeselecting) {
			selectTween.start();
		}
	}

	private deselectProject() {
		const deselectionTween = new Tween([
			this.projectMeshes[this.selectedProjectIndex].position,
			this.projectMeshes[index].rotation
		]).to([
			new Vector3(0, .15, .4),
			{
				x: Math.PI / 5,
				y: Math.PI / 3,
				z: -Math.PI / 4,
			}
		], 250)
			.onUpdate(() => {
				this.projectMeshes = [...this.projectMeshes];
		});
	}

	private updateTweens(time: number) {

		if (this.selectionTweenGroup !== undefined) {
			if (!this.selectionTweenGroup.allStopped) {
				this.selectionTweenGroup.update(time);
			}
			else {
				this.selectionTweenGroup.removeAll();
			}

		}
		requestAnimationFrame((time) => { this.updateTweens(time); });
	}

	protected render(): HTMLTemplateResult {
		if (this.resizeController.value !== undefined && this.resizeController.value !== null) {
			this.renderer.setSize(this.resizeController.value.width, this.resizeController.value.height);
		}

		this.renderer.render(this.scene, this.camera);

		this.renderer.domElement.id = "renderer";
		this.renderer.domElement.style = "";

		return html`
			${this.projectTask.render({
				complete: (projects) => {
					if (this.projectMeshes.length === 0) {
						console.log(projects)
						this.projectMeshes = this.loadProjectMeshes(projects);
						this.renderer.render(this.scene, this.camera);
					}
					return html`
						<div
							@click=${this.handleClick}
						>
							${this.renderer.domElement}
						</div>
					`;
				}
			})}
		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			display: flex;
			width: 100%;
			height: 100%;
		}

		#renderer {
			display: flex;
			width: 100%;
			height: 100%;
		}
	`;
}
