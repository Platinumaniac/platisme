export class Vector2 {
	public x: number = 0;
	public y: number = 0;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	get length(): number {
		return Math.hypot(this.x, this.y);
	}

	duplicate(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}

	add(addVector: Vector2): Vector2 {
		return new Vector2(
			this.x + addVector.x,
			this.y + addVector.y
		)
	}

	sub(subVector: Vector2): Vector2 {
		return new Vector2(
			this.x - subVector.x,
			this.y - subVector.y
		)
	}

	mult(mulVector: Vector2): Vector2 {
		return new Vector2(
			this.x * mulVector.x,
			this.y * mulVector.y
		)
	}

	div(divVector: Vector2): Vector2 {
		return new Vector2(
			this.x / divVector.x,
			this.y / divVector.y
		)
	}

	static fromAngle(angle: number): Vector2 {
		return new Vector2(Math.cos(angle), Math.sin(angle));
	}

	toAngle(): number {
		return Math.atan2(this.y, this.x);
	}
}
