import { Point } from './point';
import { SPECS } from './specs';

export class FIELD {
    public static readonly MIN_X = 0;
    public static readonly MIN_Y = 0;

    public static readonly CENTER_X = SPECS.FIELD_CENTER_X;
    public static readonly CENTER_Y = SPECS.FIELD_CENTER_Y;

    public static readonly MAX_X = SPECS.MAX_X_COORDINATE;
    public static readonly MAX_Y = SPECS.MAX_Y_COORDINATE;

    public static readonly CENTER_RADIUS = SPECS.FIELD_CENTER_RADIUS;

    public static readonly POINT_CENTER = new Point(FIELD.CENTER_X, FIELD.CENTER_Y);

    public static readonly POINT_1 = new Point(0, FIELD.MAX_Y);
    public static readonly POINT_2 = new Point(FIELD.MAX_X, FIELD.MAX_Y);
    public static readonly POINT_3 = new Point(FIELD.MAX_X, 0);
    public static readonly POINT_4 = new Point(0, 0);

    public static readonly GOAL_RADIUS = SPECS.GOAL_RADIUS;
}
