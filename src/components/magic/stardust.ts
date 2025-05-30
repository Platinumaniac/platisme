import { css, html, LitElement, svg, type CSSResultGroup, type HTMLTemplateResult, type SVGTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Vector2 } from "../../vectors";
import { randFRange, randIRange } from "../../random";

type StarTrailDeleteEventConfig = {
    trail: StarTrail;
}



type StarConfig = {
    points: number;
    radius: number;
    insetRatio: number;
    origin: Vector2;
    angle: number;
    speed: number;
    opacity: number;
}

class MagicStar {
    points: number;
    radius: number;
    opacity: number;
    insetRatio: number;
    origin: Vector2;
    angle: number;
    position: Vector2;

    delay: number;
    speed: number;
    amplitude: number;
    lifetime: number;

    constructor(config: StarConfig, delay: number, amplitude: number) {
        this.points = config.points;
        this.radius = config.radius;
        this.opacity = config.opacity;
        this.insetRatio = config.insetRatio;
        this.position = config.origin;
        this.origin = this.position.duplicate();
        this.angle = config.angle;

        this.delay = delay;
        this.speed = config.speed;
        this.amplitude = amplitude;
        this.lifetime = 0;



    }
    
    progress(delta: number) {
        if (this.delay >= 0) {
            this.delay -= delta;
            return;
        }
        this.lifetime += delta;
        this.position.x += (delta * this.speed / 10 * Math.cos(this.angle)) + (Math.sin(this.lifetime / 200) * Math.sin(this.angle) * this.amplitude);
        this.position.y += (delta * this.speed / 10 * Math.sin(this.angle)) + (Math.sin(this.lifetime / 200) * -Math.cos(this.angle) * this.amplitude); 


        //this.position.x += delta  * this.speed / 10;
        //this.position.y = this.origin.y + Math.sin(this.lifetime / 200) * this.amplitude;
    }

    render(): SVGTemplateResult {
        let pointAngle: number = (Math.PI * 2) / (this.points * 2);

        let pointCoords: Vector2[] = [];

        for (let point = 0; point < this.points * 2; point ++) {
            

            let tempCoords: Vector2 = Vector2.fromAngle(point * (pointAngle));

            if (point % 2 == 0) {
                pointCoords.push(tempCoords.mul(new Vector2(this.radius, this.radius)).add(this.position));
            } else {
				pointCoords.push(tempCoords.mul(new Vector2(this.radius * this.insetRatio, this.radius * this.insetRatio)).add(this.position));
            }
        }


		return svg`
			<polygon points=${pointCoords} class="star" style="--star-opacity:${this.opacity}"/>
		`;
    }

}





class StarTrail {

    stars: MagicStar[];
    timeLeft: number;
    opacity: number;
    opacityFalloff: number;

    constructor(starConfig: StarConfig, starAmount: number, amplitude: number = 32, delay: number = 0, radiusFalloff: number = 1, opacityFalloff: number = .1) {
        this.stars = [];
        this.timeLeft = 20000;
        this.opacity = starConfig.opacity;
        this.opacityFalloff = opacityFalloff;

        for (let starIndex = 0; starIndex < starAmount; starIndex ++) {
            this.stars.push(new MagicStar(
                {
                    points: starConfig.points,
                    radius: starConfig.radius - (radiusFalloff * starIndex),
                    insetRatio: starConfig.insetRatio,
                    origin: starConfig.origin.duplicate(),
                    speed: starConfig.speed,
                    angle: starConfig.angle,
                    opacity: starConfig.opacity - (opacityFalloff * starIndex),
                },
                delay + 150 * starIndex,
                amplitude
            ))
        }
    }

    progress(delta: number) {

        for (const [index, star] of this.stars.entries()) {
            star.progress(delta);
            star.opacity = this.opacity * (this.timeLeft / 20000) - (this.opacityFalloff * index);
            console.log(star.opacity)
        }
        this.timeLeft -= delta;
        if (this.timeLeft <= 0) {
            const event = new CustomEvent<StarTrailDeleteEventConfig>("delete-trail", {detail: {trail: this}});
            window.dispatchEvent(event);
        }



    }

    render(): SVGTemplateResult {
        let starRenders: SVGTemplateResult[] = [];

        for (const star of this.stars) {
            starRenders.push(star.render());
        }


        return svg`${starRenders}`;
    }
    
}




@customElement("plat-stardust")
export class MagicStardust extends LitElement {

    trails: StarTrail[];
    generationCooldown: number;
    timeUntilGeneration: number;
    lastLifetime: number;
    starLimit: number;
    

    constructor() {
        super();
        
        this.generationCooldown = 5000;
        this.timeUntilGeneration = this.generationCooldown;
        this.lastLifetime = 0;
        
        this.starLimit = 20;

        this.trails = [];
        this.generateTrails(this.starLimit);
    }

    connectedCallback(): void {
        super.connectedCallback();

        window.addEventListener("delete-trail", (event: CustomEventInit<StarTrailDeleteEventConfig>) => this.onTrailDelete(event));

        this.doMagic(0);
    }


    generateTrails(amount: number) {
        for (let trailIndex = 0; trailIndex < amount; trailIndex ++) {
            this.trails.push(new StarTrail({
                    points: randIRange(4, 8),
                    radius: randIRange(16, 32),
                    insetRatio: randFRange(.2, .7),
                    origin: new Vector2(-64, randIRange(256, 32)).duplicate(),
                    speed: randFRange(1, 3),
                    angle: randFRange(-Math.PI / 4, Math.PI / 4),
                    opacity: 1,
                },
                randIRange(4, 12),
                randIRange(10, 20),
                randIRange(0, 5000))
            )
        }
    }

    onTrailDelete(event: CustomEventInit<StarTrailDeleteEventConfig>) {
        const trailIndex: number = this.trails.findIndex((searchTrail) => searchTrail == event.detail!.trail);

        if (trailIndex === -1) return;

        this.trails.splice(trailIndex);
    }
    

    doMagic(lifetime: number) {
        const delta = lifetime - this.lastLifetime;

        this.timeUntilGeneration -= delta

        if (this.timeUntilGeneration <= 0) {
            this.generateTrails(this.starLimit);
            this.timeUntilGeneration = this.generationCooldown;
        }
        
        
        for (const trail of this.trails) {
            trail.progress(delta);
        }
        

        this.lastLifetime = lifetime;
        this.requestUpdate();
        requestAnimationFrame((newLifetime) => {this.doMagic(newLifetime)});
    }


    protected render(): HTMLTemplateResult {
        let renderedTrails: SVGTemplateResult[] = [];

        for (const trail of this.trails) {
            if (trail.timeLeft)

            renderedTrails.push(trail.render());
        }



        return html`
        <svg>
            ${renderedTrails}

        </svg>`;
    }

    static styles: CSSResultGroup = [
        css`
            svg {
                width: 100%;
                height: 100%;
            }
            .star {
                --star-color: #7975ca;
                --star-opacity: 1;
                
                fill: var(--star-color);
                opacity: var(--star-opacity);
            
            }
        `
    ];
    
}