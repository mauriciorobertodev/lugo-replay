import { Player } from '../player';
import { Point } from '../point';
import { Vector2D } from '../vector-2d';
import { Velocity } from '../velocity';
import { IRegion } from './region';

export interface IBall {
    getPosition(): Point;
    setPosition(point: Point): this;
    getVelocity(): Velocity;
    setVelocity(velocity: Velocity): this;
    getDirection(): Vector2D;
    getSpeed(): number;
    hasHolder(): boolean;
    getHolder(): Player | undefined;
    holderIs(holder: Player): boolean;
    directionToPlayer(player: Player): Vector2D;
    directionToPoint(point: Point): Vector2D;
    directionToRegion(region: IRegion): Vector2D;
    distanceToPlayer(player: Player): number;
    distanceToPoint(point: Point): number;
    distanceToRegion(region: IRegion): number;
}
