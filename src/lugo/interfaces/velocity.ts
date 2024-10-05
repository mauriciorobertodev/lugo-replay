import { Vector2D } from '../vector-2d';

export interface IVelocity {
    getDirection(): Vector2D;
    setDirection(direction: Vector2D): this;
    getSpeed(): number;
    setSpeed(speed: number): this;
    clone(): IVelocity;
}
