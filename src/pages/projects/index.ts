import { css, html, LitElement, type CSSResultGroup, type HTMLTemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../elements/projects/project_entry.ts";
import { AmbientLight, Object3D, PerspectiveCamera, Raycaster, Scene, SpotLight, Vector2, Vector3, WebGLRenderer } from "three/src/Three.js";
import { Task } from "@lit/task";
import type { ProjectEntry } from "../../lib/types.ts";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import { Group, Tween } from "@tweenjs/tween.js";
import "../../elements/projects/project_entry.ts";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

@customElement("plat-project-page")
export class ProjectPageElement extends LitElement {

	private projectTask: Task<[], ProjectEntry[]>;
	private resizeController: ResizeController<Vector2>;
	private renderer: WebGLRenderer;
	private camera: PerspectiveCamera;
	private scene: Scene;
	@state()
	private projectMeshes: Object3D[];
	private hoveredProjectIndex?: number;
	private selectedProjectIndex?: number;
	private selectionTweenGroup: Group;
	private loader: GLTFLoader;
	private controls?: OrbitControls;

	public constructor() {
		super();

		this.projectTask = new Task(this, {
			task: async () => {
				return (await import("../../lib/projects")).PROJECTS;
			},
			onComplete: (projects) => {
				this.projectMeshes = this.loadProjectMeshes(projects);
				this.renderer.render(this.scene, this.camera);
			},
			args: () => []
		});

		this.resizeController = new ResizeController(this, {
			callback: this.parseResize
		});

		this.scene = new Scene();
		this.projectMeshes = [];
		this.selectionTweenGroup = new Group();

		this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);

		this.camera.position.z = 15;
		this.camera.position.y = 5;
		this.camera.rotateX(-(Math.PI / 8));
		this.renderer = new WebGLRenderer();
		this.loader = new GLTFLoader();

		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new AmbientLight(color, intensity);
		this.scene.add(light);

		const light2 = new SpotLight(color, 1000);
		//light2.position.z = 3;
		//light2.position.y = 5;
		light2.rotateX(Math.PI / 4);
		this.scene.add(light2);

		this.loader.load("/src/assets/models/project_scene.glb", (gltf) => {
			this.scene.add(gltf.scene);
		}, undefined,  console.error);

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
			this.loader.load(project.modelPath, (gltf) => {
				this.scene.add(gltf.scene);

				meshes.push(gltf.scene.children[0]);
			}), undefined,  console.error;
		}

		return meshes;
	}

	private handleMouseMotion(event: PointerEvent) {
		const canvasWidth = this.resizeController.value!.width;
		const canvasHeight = this.resizeController.value!.height;
		const raycast = new Raycaster();
		raycast.setFromCamera(new Vector2(
			( event.offsetX / canvasWidth ) * 2 - 1,
			 - (event.offsetY / canvasHeight) * 2 + 1),
			this.camera);

		for (const [index, projectMesh] of this.projectMeshes.entries()) {
			if (raycast.intersectObject(projectMesh).length > 0) {
				this.hoveredProjectIndex = index;
				break;
			}
			if (index === this.projectMeshes.length - 1) {
				this.hoveredProjectIndex = undefined;
			}
		}

		if (this.hoveredProjectIndex !== undefined) {
			document.body.style.cursor = "pointer";
		}
		else {
			document.body.style.cursor = "default";
		}
	}

	private handleClick(event: PointerEvent) {
		if (this.selectedProjectIndex !== undefined) {
			this.deselectProject();
		}
		if (this.hoveredProjectIndex !== undefined) {
			this.selectProject(this.hoveredProjectIndex);
		}
	}

	private selectProject(index: number) {
		const isDeselecting = this.selectedProjectIndex !== undefined;
		console.log(index)
		const selectTween = new Tween([
			this.projectMeshes[index].position,
			this.projectMeshes[index].rotation
		]).to([
			new Vector3(0, 1, 5),
			new Vector3(Math.PI / 7, -Math.PI / 3.5, Math.PI / 4),
		], 250)
			.onUpdate(() => {
				console.log(this.projectMeshes);
				this.projectMeshes = [...this.projectMeshes];
		});

		if (isDeselecting) {
			const deselectTween = this.getDeselectTween()!;
			deselectTween.start();

			if (this.selectedProjectIndex !== index) {
				deselectTween.chain(selectTween);
			} else {
				this.selectedProjectIndex = undefined;
				return;
			}

		}

		this.selectionTweenGroup.add(selectTween);

		if (!isDeselecting) {
			selectTween.start();
			this.selectedProjectIndex = index;
		}
	}

	private deselectProject() {
		const deselectTween = this.getDeselectTween();
		deselectTween?.start();
		this.selectedProjectIndex = undefined;
	}
	private getDeselectTween(): Tween | undefined {
		if (this.selectedProjectIndex === undefined) {
			return
		}

		const deselectTween = new Tween([
			this.projectMeshes[this.selectedProjectIndex].position,
			this.projectMeshes[this.selectedProjectIndex].rotation
		]).to([
			new Vector3(this.selectedProjectIndex * .09, 0, 0),
			new Vector3(0, 0, 0),
		], 250).onUpdate(() => {
			this.projectMeshes = [...this.projectMeshes];
		});
		this.selectionTweenGroup.add(deselectTween);

		return deselectTween;
	}

	private updateTweens(time: number) {
		if (this.selectionTweenGroup !== undefined) {
			this.selectionTweenGroup.update(time);
		}

		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame((time) => { this.updateTweens(time); });
	}

	protected render(): HTMLTemplateResult {
		if (this.resizeController.value !== undefined && this.resizeController.value !== null) {
			this.camera.aspect = this.resizeController.value.width / this.resizeController.value.height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.resizeController.value.width, this.resizeController.value.height);
		}

		this.renderer.render(this.scene, this.camera);

		this.renderer.domElement.id = "renderer";
		this.renderer.domElement.style = "";

		return html`
			${this.projectTask.render({
				complete: (projects) => {
					return html`
						<div
							@mousemove=${this.handleMouseMotion}
							@click=${this.handleClick}
						>
							${this.renderer.domElement}
						</div>
						${this.selectedProjectIndex !== undefined ? html`
							<plat-project-entry
								.entry=${projects[this.selectedProjectIndex]}
							></plat-project-entry>
						` : html``}
					`;
				}
			})}

		`;
	}

	static styles: CSSResultGroup = css`
		:host {
			position: relative;

			box-sizing: border-box;
			width: 100%;
			height: 100%;


			display: flex;
		}

		#renderer {
			width: 100%;
			height: 100%;

			display: flex;
		}

		plat-project-entry {
			position: absolute;
			top: 20%;
			right: 20%;

		}
	`;
}
