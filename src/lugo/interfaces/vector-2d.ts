import { IPositionable } from './positionable';

export interface IVector2D extends IPositionable {
    clone(): IVector2D;
}
