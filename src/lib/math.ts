import { Point, Vector } from '@/types/game';

export function add(a: Point | Vector, b: Point | Vector): Point {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function addX(v: Point, value: number): Point {
    return { x: v.x + value, y: v.y };
}

export function sub(a: Point | Vector, b: Point | Vector): Point {
    return { x: a.x - b.x, y: a.y - b.y };
}

export function subY(v: Point, value: number): Point {
    return { x: v.x, y: v.y - value };
}

export function subX(v: Point, value: number): Point {
    return { x: v.x - value, y: v.y };
}

export function mag(v: Point): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function scale(v: Point, scalar: number): Point {
    return { x: v.x * scalar, y: v.y * scalar };
}

export function mult(v: Point, scalar: number): Point {
    return scale(v, scalar);
}

export function div(v: Point, scalar: number): Point {
    return { x: v.x / scalar, y: v.y / scalar };
}

export function getDistanceBetween(a: Point | Vector, b: Point | Vector): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function getDirectionFromTo(a: Point | Vector, b: Point | Vector): Point {
    const angle = getAngleInRadiansBetween(a, b);
    const cos = Math.abs(Math.cos(angle)) < Number.EPSILON ? 0 : Math.cos(angle);
    const sin = Math.abs(Math.sin(angle)) < Number.EPSILON ? 0 : Math.sin(angle);
    return { x: cos, y: sin };
}

export function getNormalizedVector(v: Point): Point {
    return div(v, mag(v));
}

export function getAngleInRadiansBetween(a: Point | Vector, b: Point | Vector): number {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

export function getAngleInDegreesBetween(a: Point | Vector, b: Point | Vector): number {
    return radiansToDegrees(getAngleInRadiansBetween(a, b));
}

export function getAngleOfVectorInRadians(v: Vector | Point): number {
    return Math.atan2(v.y, v.x);
}

export function getAngleOfVectorInDegrees(v: Point): number {
    return radiansToDegrees(getAngleOfVectorInRadians(v));
}

export function getPointPositionByDirectionAndDistance(
    point: Point,
    direction: Point,
    distance: number,
): Point {
    const normalizedDirection = getNormalizedVector(direction);
    return {
        x: point.x + normalizedDirection.x * distance,
        y: point.y + normalizedDirection.y * distance,
    };
}

export function clone(v: Point): Point {
    return { x: v.x, y: v.y };
}

export function radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function getDiffBetweenAnglesInRadians(
    angleAInRadians: number,
    angleBInRadians: number,
): number {
    let angleDiffInRadians =
        Math.max(angleAInRadians, angleBInRadians) - Math.min(angleAInRadians, angleBInRadians);
    if (angleDiffInRadians > degreesToRadians(180)) {
        angleDiffInRadians = degreesToRadians(360) - angleDiffInRadians;
    }
    return angleDiffInRadians;
}

export function checkIfTheAngleIsBetweenTheAngleDiffInRadians(
    facingAngleInRadians: number,
    targetAngleInRadians: number,
    diffFactorInRadians: number,
): boolean {
    const angleDiffInRadians = getDiffBetweenAnglesInRadians(
        facingAngleInRadians,
        targetAngleInRadians,
    );
    return angleDiffInRadians <= diffFactorInRadians && angleDiffInRadians >= -diffFactorInRadians;
}

export function randomIntBetween(a: number, b: number): number {
    const min = Math.floor(Math.min(a, b));
    const max = Math.ceil(Math.max(a, b));
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function linearInterpolation(a: number, b: number, offset: number): number {
    return a * (1 - offset) + b * offset;
}

export function linearInterpolation2D(a: Point, b: Point, percentage: number): Point {
    const result = { x: 0, y: 0 };

    result.x = linearInterpolation(a.x, b.x, percentage);
    result.y = linearInterpolation(a.y, b.y, percentage);

    return result;
}
