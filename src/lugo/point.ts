import { Vector2D } from '.';
import { IPositionable } from './interfaces';
import { IVector2D } from './interfaces/vector-2d';

export class Point implements IVector2D {
    protected x: number;
    protected y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    eq(positionable: IPositionable): boolean {
        return this.x === positionable.getX() && this.y === positionable.getY();
    }

    is(positionable: IPositionable): boolean {
        return this === positionable;
    }

    getX(): number {
        return this.x;
    }

    setX(x: number): this {
        this.x = x;
        return this;
    }

    addX(value: number): this {
        this.x += value;
        return this;
    }

    subtractX(value: number): this {
        this.x -= value;
        return this;
    }

    scaleX(value: number): this {
        this.x *= value;
        return this;
    }

    divideX(value: number): this {
        this.x /= value;
        return this;
    }

    getY(): number {
        return this.y;
    }

    setY(y: number): this {
        this.y = y;
        return this;
    }

    addY(value: number): this {
        this.y += value;
        return this;
    }

    subtractY(value: number): this {
        this.y -= value;
        return this;
    }

    scaleY(value: number): this {
        this.y *= value;
        return this;
    }

    divideY(value: number): this {
        this.y /= value;
        return this;
    }

    normalize(): this {
        const magnitude = this.magnitude();
        if (magnitude !== 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    }

    normalized(): IPositionable {
        return this.clone().normalize();
    }

    add(value: IPositionable | number): this {
        if (typeof value === 'number') {
            this.x += value;
            this.y += value;
        } else {
            this.x += value.getX();
            this.y += value.getY();
        }
        return this;
    }

    added(value: IPositionable | number): Point {
        return this.clone().add(value);
    }

    subtract(value: IPositionable | number): this {
        if (typeof value === 'number') {
            this.x -= value;
            this.y -= value;
        } else {
            this.x -= value.getX();
            this.y -= value.getY();
        }
        return this;
    }

    subtracted(value: IPositionable | number): Point {
        return this.clone().subtract(value);
    }

    divide(value: IPositionable | number): this {
        if (typeof value === 'number') {
            this.x /= value;
            this.y /= value;
        } else {
            this.x /= value.getX();
            this.y /= value.getY();
        }
        return this;
    }

    divided(value: IPositionable | number): Point {
        return this.clone().divide(value);
    }

    scale(value: IPositionable | number): this {
        if (typeof value === 'number') {
            this.x *= value;
            this.y *= value;
        } else {
            this.x *= value.getX();
            this.y *= value.getY();
        }
        return this;
    }

    scaled(value: IPositionable | number): Point {
        return this.clone().scale(value);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angleInRadians(): number {
        return Math.atan2(this.y, this.x);
    }

    directionTo(to: IPositionable): Vector2D {
        const dx = to.getX() - this.x;
        const dy = to.getY() - this.y;
        return new Vector2D(dx, dy).normalize();
    }

    distanceTo(to: IPositionable): number {
        const dx = to.getX() - this.x;
        const dy = to.getY() - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    moveToDirection(direction: Vector2D, distance: number): this {
        this.x += direction.getX() * distance;
        this.y += direction.getY() * distance;
        return this;
    }

    movedToDirection(direction: Vector2D, distance: number): Point {
        return this.clone().moveToDirection(direction, distance);
    }

    moveToPoint(point: Point, distance: number): this {
        const direction = this.directionTo(point);
        return this.moveToDirection(direction, distance);
    }

    movedToPoint(point: Point, distance: number): Point {
        return this.clone().moveToPoint(point, distance);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    toVector2D(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    toPoint(): Point {
        return new Point(this.x, this.y);
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }
}
