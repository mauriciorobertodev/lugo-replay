import { IMapper, IPlayer, IRegion } from './interfaces';
import { Point } from './point';
import { Side } from './side';

export class Region implements IRegion {
    constructor(
        protected col: number,
        protected row: number,
        protected side: Side,
        protected center: Point,
        protected mapper: IMapper,
    ) {}

    is(region: IRegion): boolean {
        return this.eq(region);
    }

    eq(region: IRegion): boolean {
        return region.getCol() === this.col && region.getRow() === this.row;
    }

    getCol(): number {
        return this.col;
    }

    getRow(): number {
        return this.row;
    }

    getCenter(): Point {
        return this.center;
    }

    frontRight(): IRegion {
        return this.front().right();
    }

    front(): IRegion {
        return this.mapper.getRegion(Math.min(this.col + 1, this.mapper.getCols()), this.row);
    }

    frontLeft(): IRegion {
        return this.front().left();
    }

    backRight(): IRegion {
        return this.back().right();
    }

    back(): IRegion {
        return this.mapper.getRegion(Math.max(this.col - 1, 0), this.row);
    }

    backLeft(): IRegion {
        return this.back().left();
    }

    left(): IRegion {
        return this.mapper.getRegion(this.col, Math.max(this.row - 1, 0));
    }

    right(): IRegion {
        return this.mapper.getRegion(this.col, Math.min(this.row + 1, this.mapper.getRows()));
    }

    coordinates(): Point {
        return new Point(this.col, this.row);
    }

    distanceToRegion(region: IRegion): number {
        return this.coordinates().distanceTo(region.coordinates());
    }

    distanceToPoint(point: Point): number {
        return this.getCenter().distanceTo(point);
    }

    containsPlayer(player: IPlayer): boolean {
        return this.mapper.getRegionFromPoint(player.getPosition()).is(this);
    }

    toString(): string {
        return `[${this.col}, ${this.row}]`;
    }
}
