import { Point } from '../point';
import { Side } from '../side';

export interface IGoal {
    getCenter(): Point;
    getPlace(): Side;
    getTopPole(): Point;
    getBottomPole(): Point;
}
