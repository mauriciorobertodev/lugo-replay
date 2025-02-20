import { IPoint } from './point';
import { IVector2D } from './vector-2d';

export interface IPositionable {
    eq(positionable: IPositionable): boolean;
    is(positionable: IPositionable): boolean;

    getX(): number;
    setX(x: number): this;
    addX(value: number): this;
    subtractX(value: number): this;
    scaleX(value: number): this;
    divideX(value: number): this;

    getY(): number;
    setY(y: number): this;
    addY(value: number): this;
    subtractY(value: number): this;
    scaleY(value: number): this;
    divideY(value: number): this;

    normalize(): this;
    normalized(): IPositionable;

    add(value: IPositionable | number): this;
    added(value: IPositionable | number): IPositionable;

    subtract(value: IPositionable | number): this;
    subtracted(value: IPositionable | number): IPositionable;

    divide(value: IPositionable | number): this;
    divided(value: IPositionable | number): IPositionable;

    scale(value: IPositionable | number): this;
    scaled(value: IPositionable | number): IPositionable;

    magnitude(): number;
    angleInRadians(): number;
    clone(): IPositionable;

    directionTo(to: IPositionable): IVector2D;
    distanceTo(to: IPositionable): number;

    moveToDirection(direction: IVector2D, distance: number): this;
    movedToDirection(direction: IVector2D, distance: number): IPositionable;

    moveToPoint(point: IPoint, distance: number): this;
    movedToPoint(point: IPoint, distance: number): IPositionable;

    toString(): string;
    toVector2D(): IVector2D;
    toPoint(): IPoint;
}
