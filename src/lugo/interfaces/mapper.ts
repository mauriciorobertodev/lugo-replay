import { Point } from '../point';
import { Side } from '../side';
import { IRegion } from './region';

export interface IMapper {
    getCols(): number;
    setCols(cols: number): this;
    getRows(): number;
    getRegionWidth(): number;
    getRegionHeight(): number;
    setRows(rows: number): this;
    getSide(): Side;
    getRegion(col: number, row: number): IRegion;
    getRegionFromPoint(point: Point): IRegion;
    getRandomRegion(): IRegion;
}
