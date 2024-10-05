import { Point, Side, SPECS } from '@/lugo';
import { IGoal } from './interfaces/goal';

export class Goal implements IGoal {
    constructor(
        protected place: Side,
        protected center: Point,
        protected topPole: Point,
        protected bottomPole: Point,
    ) {}

    getCenter(): Point {
        return this.center;
    }

    getPlace(): Side {
        return this.place;
    }

    getTopPole(): Point {
        return this.topPole;
    }

    getBottomPole(): Point {
        return this.bottomPole;
    }

    static HOME(): Goal {
        return new Goal(
            Side.HOME,
            new Point(0, SPECS.MAX_Y_COORDINATE / 2),
            new Point(0, SPECS.GOAL_MAX_Y),
            new Point(0, SPECS.GOAL_MIN_Y),
        );
    }

    static AWAY(): Goal {
        return new Goal(
            Side.AWAY,
            new Point(SPECS.MAX_X_COORDINATE, SPECS.MAX_Y_COORDINATE / 2),
            new Point(SPECS.MAX_X_COORDINATE, SPECS.GOAL_MAX_Y),
            new Point(SPECS.MAX_X_COORDINATE, SPECS.GOAL_MIN_Y),
        );
    }
}
