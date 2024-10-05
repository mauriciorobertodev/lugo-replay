import { Player } from '../player';
import { Point } from '../point';
import { IPositionable } from './positionable';

export interface IRegion {
    eq(region: IRegion): boolean;
    is(region: IRegion): boolean;
    getCol(): number;
    getRow(): number;
    getCenter(): Point;
    frontRight(): IRegion;
    front(): IRegion;
    frontLeft(): IRegion;
    backRight(): IRegion;
    back(): IRegion;
    backLeft(): IRegion;
    left(): IRegion;
    right(): IRegion;
    coordinates(): IPositionable;
    distanceToRegion(region: IRegion): number;
    distanceToPoint(point: Point): number;
    containsPlayer(player: Player): boolean;
    toString(): string;
}
