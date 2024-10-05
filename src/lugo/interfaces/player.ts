import { Point } from '../point';
import { Side } from '../side';
import { Vector2D } from '../vector-2d';
import { Velocity } from '../velocity';
import { IRegion } from './region';

export interface IPlayer {
    getNumber(): number;
    getSpeed(): number;
    getDirection(): Vector2D;
    getPosition(): Point;
    getVelocity(): Velocity;
    getTeamSide(): Side;
    getInitPosition(): Point;
    getIsJumping(): boolean;
    isGoalkeeper(): boolean;
    is(player: IPlayer): boolean;
    eq(player: IPlayer): boolean;
    isInAttackSide(): boolean;
    isInDefenseSide(): boolean;
    directionToPlayer(player: IPlayer): Vector2D;
    directionToPoint(point: Point): Vector2D;
    directionToRegion(region: IRegion): Vector2D;
    distanceToPlayer(player: IPlayer): number;
    distanceToPoint(point: Point): number;
    distanceToRegion(region: IRegion): number;
    //
    getColor(): string;
    setColor(color: string): IPlayer;
}
