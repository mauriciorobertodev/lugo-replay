import { Point } from '@/lugo';
import { IPositionable } from '@/lugo/interfaces';

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

export function linearInterpolation2D(
    a: IPositionable,
    b: IPositionable,
    percentage: number,
): Point {
    return new Point(
        linearInterpolation(a.getX(), b.getX(), percentage),
        linearInterpolation(a.getY(), b.getY(), percentage),
    );
}
