import { Vector2D } from '@/lugo';
import { IVelocity } from './interfaces/velocity';

export class Velocity implements IVelocity {
    constructor(
        private direction: Vector2D = new Vector2D(),
        private speed: number = 0,
    ) {}

    getDirection(): Vector2D {
        return this.direction;
    }

    setDirection(direction: Vector2D): this {
        this.direction = direction.clone();
        return this;
    }

    getSpeed(): number {
        return this.speed;
    }

    setSpeed(speed: number): this {
        this.speed = speed;
        return this;
    }

    clone(): Velocity {
        return new Velocity(this.direction.clone(), this.speed);
    }
}
