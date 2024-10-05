import { Point } from '../point';

export type FormationType = 'region' | 'point';

export interface IFormation {
    getName(): string;
    setName(name: string): this;
    getType(): FormationType;
    setType(type: FormationType): this;
    getPositionOf(playerNumber: number): Point;
    setPositionOf(playerNumber: number, position: Point): this;
    definePositionOf(playerNumber: number, x: number, y: number): this;
}
