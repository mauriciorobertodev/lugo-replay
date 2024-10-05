import { Player } from './player';
import { Point } from './point';
import { Velocity } from './velocity';
import { IRegion } from './interfaces/region';
import { SPECS } from './specs';
import { Vector2D } from './vector-2d';
import { IBall } from './interfaces/ball';

export type BallProps = {
    position: Point;
    velocity: Velocity;
    holder?: Player;
};

export class Ball implements IBall {
    private position: Point;
    private velocity: Velocity;
    private holder?: Player;

    constructor(props?: BallProps) {
        this.position = props?.position ?? new Point(SPECS.FIELD_CENTER_X, SPECS.FIELD_CENTER_Y);
        this.velocity = props?.velocity ?? new Velocity();
        this.holder = props?.holder;
    }

    getPosition(): Point {
        return this.position;
    }

    setPosition(position: Point): this {
        this.position = position;
        return this;
    }

    getVelocity(): Velocity {
        return this.velocity;
    }

    setVelocity(velocity: Velocity): this {
        this.velocity = velocity;
        return this;
    }

    getDirection(): Vector2D {
        return this.getVelocity().getDirection();
    }

    getSpeed(): number {
        return this.getVelocity().getSpeed();
    }

    hasHolder(): boolean {
        return this.holder !== undefined;
    }

    getHolder(): Player | undefined {
        return this.holder;
    }

    setHolder(holder?: Player): Ball {
        this.holder = holder;
        return this;
    }

    holderIs(holder: Player): boolean {
        if (!this.holder) return false;
        return (
            this.holder.getNumber() === holder.getNumber() &&
            this.holder.getTeamSide() === holder.getTeamSide()
        );
    }

    directionToPlayer(player: Player): Vector2D {
        return this.getPosition().directionTo(player.getPosition());
    }

    directionToPoint(point: Point): Vector2D {
        return this.getPosition().directionTo(point);
    }

    directionToRegion(region: IRegion): Vector2D {
        return this.getPosition().directionTo(region.getCenter());
    }

    distanceToPlayer(player: Player): number {
        return this.getPosition().distanceTo(player.getPosition());
    }

    distanceToPoint(point: Point): number {
        return this.getPosition().distanceTo(point);
    }

    distanceToRegion(region: IRegion): number {
        return this.getPosition().distanceTo(region.getCenter());
    }

    static newZeroed(): Ball {
        return new Ball({
            position: new Point(SPECS.FIELD_CENTER_X, SPECS.FIELD_CENTER_Y),
            velocity: new Velocity(),
        });
    }
}
