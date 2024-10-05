import { IMapper } from './interfaces';
import { Point } from './point';
import { Region } from './region';
import { Side } from './side';
import { SPECS } from './specs';

export class Mapper implements IMapper {
    private regionWidth: number;
    private regionHeight: number;

    constructor(
        private cols: number,
        private rows: number,
        private side: Side,
    ) {
        // if (cols < 4) {
        //     throw new Error('Número de colunas abaixo do mínimo permitido');
        // }

        // if (cols > 200) {
        //     throw new Error('Número de colunas acima do máximo permitido');
        // }

        // if (rows < 2) {
        //     throw new Error('Número de linhas abaixo do mínimo permitido');
        // }

        // if (rows > 100) {
        //     throw new Error('Número de linhas acima do máximo permitido');
        // }

        this.regionWidth = SPECS.MAX_X_COORDINATE / cols;
        this.regionHeight = SPECS.MAX_Y_COORDINATE / rows;
    }

    getCols(): number {
        return this.cols;
    }

    setCols(cols: number): this {
        this.cols = cols;
        this.regionWidth = SPECS.MAX_X_COORDINATE / cols;
        return this;
    }

    getRows(): number {
        return this.rows;
    }

    setRows(rows: number): this {
        this.rows = rows;
        this.regionHeight = SPECS.MAX_Y_COORDINATE / rows;
        return this;
    }

    getSide(): Side {
        return this.side;
    }

    getRegion(col: number, row: number): Region {
        if (col < 0 || row < 0) {
            throw new Error('As regiões do campo partem do 0x0');
        }

        if (col >= this.cols) {
            throw new Error(`O campo foi mapeado até ${this.cols} colunas`);
        }

        if (row >= this.rows) {
            throw new Error(`O campo foi mapeado até ${this.rows} linhas`);
        }

        col = Math.max(0, Math.min(this.cols - 1, col));
        row = Math.max(0, Math.min(this.rows - 1, row));

        let center = new Point();
        center.setX(Math.round(col * this.regionWidth + this.regionWidth / 2));
        center.setY(Math.round(row * this.regionHeight + this.regionHeight / 2));

        if (this.side === Side.AWAY) {
            center = this.mirrorCoordsToAway(center);
        }

        return new Region(col, row, this.side, center, this);
    }

    getRegionWidth(): number {
        return this.regionWidth;
    }

    getRegionHeight(): number {
        return this.regionHeight;
    }

    getRegionFromPoint(point: Point): Region {
        if (this.side === Side.AWAY) {
            point = this.mirrorCoordsToAway(point);
        }

        const cx = Math.floor(point.getX() / this.regionWidth);
        const cy = Math.floor(point.getY() / this.regionHeight);

        const col = Math.min(cx, this.cols - 1);
        const row = Math.min(cy, this.rows - 1);

        return this.getRegion(col, row);
    }

    getRandomRegion(): Region {
        return this.getRegion(
            Math.floor(Math.random() * this.cols),
            Math.floor(Math.random() * this.rows),
        );
    }

    private mirrorCoordsToAway(center: Point): Point {
        const mirrored = new Point();
        mirrored.setX(SPECS.MAX_X_COORDINATE - center.getX());
        mirrored.setY(SPECS.MAX_Y_COORDINATE - center.getY());
        return mirrored;
    }

    public clone(): Mapper {
        return new Mapper(this.cols, this.rows, this.side);
    }
}
