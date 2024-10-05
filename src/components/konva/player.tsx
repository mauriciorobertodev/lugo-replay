import { Arc, Circle, Group, KonvaNodeEvents, Text } from 'react-konva';
import { SPECS } from '@/lugo';
import { white } from '@/lib/tailwindcss';
import { Player, Point } from '@/lugo';
import { radiansToDegrees } from '@/lib/math';
import Konva from 'konva';

export type PlayerState = {
    number: number;
    color: string;
    position: Point;
    direction: Point;
};

export function PlayerKonva({
    player,
    ...rest
}: Konva.GroupConfig & KonvaNodeEvents & { player: Player }) {
    const textDimensions = SPECS.PLAYER_RADIUS + 30;
    const ANGLE = radiansToDegrees(player.getDirection().angleInRadians());

    return (
        <Group {...rest} x={player.getPosition().getX()} y={player.getPosition().getY()}>
            <Circle
                x={0}
                y={0}
                radius={SPECS.PLAYER_RADIUS}
                fill={player.getColor()}
                stroke={white()}
                strokeWidth={20}
            />
            <Arc
                x={0}
                y={0}
                fill={white()}
                angle={60}
                innerRadius={SPECS.PLAYER_RADIUS}
                outerRadius={0}
                rotation={ANGLE - 60 / 2}
            />
            <Circle
                x={0}
                y={0}
                radius={SPECS.PLAYER_RADIUS * 0.65}
                fill={white()}
                stroke={player.getColor()}
                strokeWidth={20}
            />
            <Text
                x={0}
                y={0}
                width={textDimensions}
                height={textDimensions}
                offsetX={textDimensions / 2}
                offsetY={textDimensions / 2 - 15}
                text={`${player.getNumber()}`}
                fill={player.getColor()}
                fontSize={200}
                align="center"
                verticalAlign="middle"
                fontStyle="bold"
                padding={0}
                lineHeight={100}
                scaleY={-1}
            />
        </Group>
    );
}
