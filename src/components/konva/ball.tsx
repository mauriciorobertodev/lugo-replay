import { Circle, Group } from 'react-konva';
import { white } from '@/lib/tailwindcss';
import Konva from 'konva';
import { Ball, Point, SPECS } from '@/lugo';

export type PlayerState = {
    number: number;
    color: string;
    position: Point;
    direction: Point;
};

export function BallKonva({
    ball,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
}: {
    ball: Ball;
    onClick?: (evt: Konva.KonvaEventObject<MouseEvent>, ball: Ball) => void;
    onMouseEnter?: (evt: Konva.KonvaEventObject<MouseEvent>, ball: Ball) => void;
    onMouseLeave?: (evt: Konva.KonvaEventObject<MouseEvent>, ball: Ball) => void;
    onMouseDown?: (evt: Konva.KonvaEventObject<MouseEvent>, ball: Ball) => void;
}) {
    const position = ball.getPosition();

    return (
        <Group
            onClick={(e) => onClick && onClick(e, ball)}
            onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, ball)}
            onMouseLeave={(e) => onMouseLeave && onMouseLeave(e, ball)}
            onMouseDown={(e) => onMouseDown && onMouseDown(e, ball)}
        >
            <Circle
                x={position.getX()}
                y={position.getY()}
                radius={SPECS.BALL_RADIUS}
                fill={white()}
                stroke={white()}
                strokeWidth={20}
            />
        </Group>
    );
}
