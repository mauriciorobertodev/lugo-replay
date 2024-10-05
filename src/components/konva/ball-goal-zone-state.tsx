import { Circle } from 'react-konva';
import { green, red, yellow } from '@/lib/tailwindcss';
import { SPECS } from '@/lugo';
import { useReplay } from '@/hooks/use-replay';
import { TurnsBallInGoalZoneState } from '@/lugo/snapshot';

function getTurnsBallInGoalZoneColor(state: TurnsBallInGoalZoneState): string {
    switch (state) {
        case 'normal':
            return green();
        case 'alert':
            return yellow();
        case 'danger':
            return red();
        default:
            return 'transparent';
    }
}

export function BallGoalZoneStateKonva() {
    const { currentGameSnapshot } = useReplay();
    const ball = currentGameSnapshot?.getBall();

    if (!ball || !currentGameSnapshot) return null;

    const position = ball.getPosition();
    const color = getTurnsBallInGoalZoneColor(currentGameSnapshot.getTurnsBallInGoalZoneState());

    return (
        <Circle
            x={position.getX()}
            y={position.getY()}
            radius={SPECS.BALL_RADIUS + 25}
            stroke={color}
            strokeWidth={50}
        />
    );
}
