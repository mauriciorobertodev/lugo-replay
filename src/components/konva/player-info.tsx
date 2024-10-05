import { Group, Text } from 'react-konva';
import { Goal, Player, Side, SPECS } from '@/lugo';
import { toBRLNumber } from '@/lib/formaters';
import { useBaseStage } from '@/hooks/use-base-stage';

function getPositionAndRotation(p: Player) {
    if (p.isGoalkeeper() && p.getTeamSide() === Side.HOME) {
        return {
            position: Goal.HOME_CENTER(),
            rotation: 90,
        };
    }

    if (p.isGoalkeeper() && p.getTeamSide() === Side.AWAY) {
        return {
            position: Goal.AWAY_CENTER(),
            rotation: -90,
        };
    }

    return {
        position: p.getPosition(),
        rotation: undefined,
    };
}

export function PlayerInfoKonva({ player }: { player: Player }) {
    const { backgroundColor } = useBaseStage();
    const { position, rotation } = getPositionAndRotation(player);

    return (
        <Group x={position.getX()} y={position.getY()} rotation={rotation}>
            <Text
                x={0}
                y={SPECS.PLAYER_SIZE + 100}
                text={`(${toBRLNumber(player.getPosition().getX(), 0)}, ${toBRLNumber(player.getPosition().getY(), 0)}) ${toBRLNumber(player.getSpeed())} d/t`}
                width={3000}
                height={200}
                offsetX={3000 / 2}
                fill={player.getColor()}
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
