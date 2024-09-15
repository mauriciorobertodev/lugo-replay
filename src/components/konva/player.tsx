import { Arc, Circle, Group, Rect, Text } from 'react-konva';
import {
    FIELD_WIDTH,
    GOALKEEPER_NUMBER,
    GOALKEEPER_WIDTH,
    PLAYER_RADIUS,
    PLAYER_SIZE,
} from '@/lib/specs';
import { blue, white } from '@/lib/tailwindcss';
import { getAngleOfVectorInRadians, radiansToDegrees } from '@/lib/math';
import Konva from 'konva';
import { Player, Point } from '@/types/game';
import React from 'react';

export type PlayerState = {
    number: number;
    color: string;
    position: Point;
    direction: Point;
};

export function PlayerKonva({
    player,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
}: {
    player: Player;
    onClick?: (evt: Konva.KonvaEventObject<MouseEvent>, player: Player) => void;
    onMouseEnter?: (evt: Konva.KonvaEventObject<MouseEvent>, player: Player) => void;
    onMouseLeave?: (evt: Konva.KonvaEventObject<MouseEvent>, player: Player) => void;
    onMouseDown?: (evt: Konva.KonvaEventObject<MouseEvent>, player: Player) => void;
}) {
    const textDimensions = PLAYER_RADIUS + 30;

    const side = player.team_side;
    const position = player.position;
    const direction = { x: player.velocity.direction.x ?? 0, y: player.velocity.direction.y ?? 0 };
    const number = player.number;
    const color = player.color ?? blue('500');
    const ANGLE = radiansToDegrees(getAngleOfVectorInRadians(direction));

    if (player.number === GOALKEEPER_NUMBER) {
        return (
            <Group
                onClick={(e) => onClick && onClick(e, player)}
                onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, player)}
                onMouseLeave={(e) => onMouseLeave && onMouseLeave(e, player)}
                onMouseDown={(e) => onMouseDown && onMouseDown(e, player)}
            >
                <Rect
                    x={(position.x ?? 0) - PLAYER_SIZE / 2}
                    y={(position.y ?? 0) - GOALKEEPER_WIDTH / 2}
                    fill={white()}
                    strokeWidth={20}
                    height={GOALKEEPER_WIDTH}
                    width={PLAYER_SIZE}
                    cornerRadius={50}
                />
            </Group>
        );
    }

    return (
        <Group
            onClick={(e) => onClick && onClick(e, player)}
            onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, player)}
            onMouseLeave={(e) => onMouseLeave && onMouseLeave(e, player)}
            onMouseDown={(e) => onMouseDown && onMouseDown(e, player)}
        >
            <Circle
                x={position.x}
                y={position.y}
                radius={PLAYER_RADIUS}
                fill={color}
                stroke={white()}
                strokeWidth={20}
            />

            <Arc
                x={position.x}
                y={position.y}
                fill={white()}
                angle={60}
                innerRadius={PLAYER_RADIUS}
                outerRadius={0}
                rotation={ANGLE - 60 / 2}
            />

            <Circle
                x={position.x}
                y={position.y}
                radius={PLAYER_RADIUS * 0.65}
                fill={white()}
                stroke={color}
                strokeWidth={20}
            />

            <Text
                x={position.x}
                y={position.y}
                width={textDimensions}
                height={textDimensions}
                offsetX={textDimensions / 2}
                offsetY={textDimensions / 2 - 15}
                text={`${number}`}
                // scaleY={-1}
                fill={color}
                fontSize={200}
                align="center"
                verticalAlign="middle"
                fontStyle="bold"
                padding={0}
                lineHeight={100}
            />
        </Group>
    );
}
