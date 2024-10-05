import { IPositionable } from './positionable';

export interface IPoint extends IPositionable {
    clone(): IPoint;
}
