import { Side } from './side';
import { SPECS } from './specs';

export type ShotClockState = 'normal' | 'alert' | 'danger';

export class ShotClock {
    constructor(
        private remaining_turns: number,
        private side?: Side,
    ) {}

    getRemainingTurns(): number {
        return this.remaining_turns;
    }

    getSide(): Side | undefined {
        return this.side;
    }

    getState(): ShotClockState {
        if (this.remaining_turns >= (SPECS.SHOT_CLOCK_TIME / 3) * 2) {
            return 'normal';
        }

        if (this.remaining_turns <= SPECS.SHOT_CLOCK_TIME / 3) {
            return 'danger';
        }

        return 'alert';
    }
}
