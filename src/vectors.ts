
export class Vector2 {
	x: number = 0;
	y: number = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	duplicate(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	toString(): string {
		return `${this.x},${this.y}`
	}

	add(addVector: Vector2): Vector2 {
		return new Vector2(
			this.x + addVector.x,
			this.y + addVector.y
		)
	}

	mul(mulVector: Vector2): Vector2 {
		return new Vector2(
			this.x * mulVector.x,
			this.y * mulVector.y
		)
	}

	static fromAngle(angle: number): Vector2 {
		return new Vector2(Math.cos(angle), Math.sin(angle));
	}
}