import { Line } from 'react-konva';
import { white } from '@/lib/tailwindcss';
import { Ball, Point } from '@/lugo';

export type PlayerState = {
    number: number;
    color: string;
    position: Point;
    direction: Point;
};

export function BallDirectionKonva({ ball }: { ball: Ball }) {
    const A = ball.getPosition();
    const B = A.added(ball.getDirection().scaled(5000));

    return (
        <Line
            points={[A.getX(), A.getY(), B.getX(), B.getY()]}
            stroke={white(1)}
            dash={[100]}
            strokeWidth={25}
        />
    );
}
