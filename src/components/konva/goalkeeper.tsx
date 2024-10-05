import { Arc, Circle, Group, KonvaNodeEvents, Rect, Text } from 'react-konva';
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

export function GoalkeeperKonva({
    player,
    ...rest
}: Konva.GroupConfig & KonvaNodeEvents & { player: Player }) {
    return (
        <Group {...rest} x={player.getPosition().getX()} y={player.getPosition().getY()}>
            <Rect
                x={0}
                y={0}
                offsetX={SPECS.PLAYER_RADIUS / 2}
                offsetY={SPECS.GOALKEEPER_SIZE / 2}
                width={SPECS.PLAYER_RADIUS}
                height={SPECS.GOALKEEPER_SIZE}
                fill={player.getColor()}
                cornerRadius={25}
            />
        </Group>
    );
}
