import { blue } from '../lib/tailwindcss';
import { randomUUID } from '../lib/utils';
import { Point } from './point';
import { Side } from './side';
import { Vector2D } from './vector-2d';
import { Velocity } from './velocity';
import { SPECS } from './specs';
import { IPlayer } from './interfaces/player';
import { IRegion } from './interfaces/region';

export type PlayerProps = {
    uuid?: string;
    number?: number;
    color?: string;
    direction?: Vector2D;
    position?: Point;
    velocity?: Velocity;
    teamSide?: Side;
    initPosition?: Point;
};

export class Player implements IPlayer {
    private uuid: string;
    private number: number;
    private color: string;
    private teamSide: Side;
    private position: Point;
    private velocity: Velocity;
    private initPosition: Point;
    private isJumping: boolean;

    constructor(props?: PlayerProps) {
        this.uuid = props?.uuid ?? randomUUID();
        this.number = props?.number ?? 0;
        this.position = props?.position ?? new Point();
        this.velocity = props?.velocity ?? new Velocity();
        this.teamSide = props?.teamSide ?? Side.HOME;
        this.initPosition = props?.initPosition ?? new Point();
        this.color = props?.color ?? blue();
        this.isJumping = false;
    }

    is(player: IPlayer): boolean {
        return this.teamSide === player.getTeamSide() && this.number === player.getNumber();
    }

    eq(player: IPlayer): boolean {
        return this.is(player);
    }

    getIsJumping(): boolean {
        return this.isJumping;
    }

    getUuid(): string {
        return this.uuid;
    }

    getColor(): string {
        return this.color;
    }

    setColor(color: string): Player {
        this.color = color;
        return this;
    }

    getNumber(): number {
        return this.number;
    }

    setNumber(value: number): Player {
        this.number = value;
        return this;
    }

    getPosition(): Point {
        return this.position;
    }

    setPosition(position: Point): Player {
        this.position = position.clone();
        return this;
    }

    getVelocity(): Velocity {
        return this.velocity;
    }

    setVelocity(value: Velocity): Player {
        this.velocity = value;
        return this;
    }

    getDirection(): Vector2D {
        return this.velocity.getDirection();
    }

    setDirection(direction: Vector2D): Player {
        this.velocity.setDirection(direction);
        return this;
    }

    getSpeed(): number {
        return this.velocity.getSpeed();
    }

    getTeamSide(): Side {
        return this.teamSide;
    }

    setTeamSide(value: Side): Player {
        this.teamSide = value;
        return this;
    }

    getInitPosition(): Point {
        return this.initPosition;
    }

    setInitPosition(position: Point): Player {
        this.initPosition = position.clone();
        return this;
    }

    clone(): Player {
        return new Player({
            number: this.number,
            color: this.color,
            position: this.position.clone(),
            velocity: this.velocity.clone(),
            teamSide: this.teamSide,
            initPosition: this.initPosition.clone(),
        });
    }

    isEqual(player: Player): boolean {
        return this.uuid === player.getUuid();
    }

    isGoalkeeper(): boolean {
        return this.number === SPECS.GOALKEEPER_NUMBER;
    }

    isInAttackSide(): boolean {
        const isOnRightSide = this.position.getX() > SPECS.FIELD_CENTER_X;
        return this.teamSide === Side.HOME ? isOnRightSide : !isOnRightSide;
    }

    isInDefenseSide(): boolean {
        const isOnLeftSide = this.position.getX() < SPECS.FIELD_CENTER_X;
        return this.teamSide === Side.HOME ? isOnLeftSide : !isOnLeftSide;
    }

    directionToPlayer(player: IPlayer): Vector2D {
        return this.position.directionTo(player.getPosition());
    }

    distanceToPlayer(player: IPlayer): number {
        return this.position.distanceTo(player.getPosition());
    }

    directionToPoint(point: Point): Vector2D {
        return this.position.directionTo(point);
    }

    distanceToPoint(point: Point): number {
        return this.position.distanceTo(point);
    }

    directionToRegion(region: IRegion): Vector2D {
        return this.position.directionTo(region.getCenter());
    }

    distanceToRegion(region: IRegion): number {
        return this.position.distanceTo(region.getCenter());
    }
}
