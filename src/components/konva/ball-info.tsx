import { Group, Text } from 'react-konva';
import { white } from '@/lib/tailwindcss';
import { Ball, Point, SPECS } from '@/lugo';
import { toBRLNumber } from '@/lib/formaters';
import { useBaseStage } from '@/hooks/use-base-stage';

export type PlayerState = {
    number: number;
    color: string;
    position: Point;
    direction: Point;
};

export function BallInfoKonva({ ball }: { ball: Ball }) {
    const { backgroundColor } = useBaseStage();
    const position = ball.getPosition();

    return (
        <Group x={position.getX()} y={position.getY()}>
            {/* <Circle x={0} y={0} radius={SPECS.BALL_RADIUS + 25} stroke={white()} strokeWidth={50} /> */}
            <Text
                x={0}
                y={SPECS.BALL_SIZE + 100}
                text={`(${toBRLNumber(ball.getPosition().getX(), 0)}, ${toBRLNumber(ball.getPosition().getY(), 0)}) ${toBRLNumber(ball.getSpeed())} d/t`}
                // text={`(20.000,00, 20.000,00) 400,00 d/t`}
                width={3000}
                height={200}
                offsetX={3000 / 2}
                fill={white()}
                fontSize={200}
                align="center"
                verticalAlign="middle"
                fontStyle="bold"
                padding={0}
                lineHeight={200}
                stroke={backgroundColor}
                strokeWidth={5}
                scaleY={-1}
            />
        </Group>
    );
}
