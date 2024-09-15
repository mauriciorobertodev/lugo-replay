import { Stage, Layer } from 'react-konva';
import { FieldKonva } from '@/components/konva/field';
import { useBaseStage } from '@/hooks/use-base-stage';
import { useEffect } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import {
    FIELD_HEIGHT,
    FIELD_POINT_1,
    FIELD_POINT_2,
    FIELD_POINT_3,
    FIELD_POINT_4,
    FIELD_WIDTH,
} from '@/lib/specs';
import { PlayerKonva } from './components/konva/player';
import { GameSnapshot, Player, Side } from './types/game';
import { linearInterpolation2D } from './lib/math';
import { blue, green } from './lib/tailwindcss';

export function Replay({ game_snapshot }: { game_snapshot: GameSnapshot | null }) {
    const { setZoomInDecimal, stageRef, scaleForScreen, centerScreenOnObject } = useBaseStage();
    const size = useWindowSize();

    useEffect(() => {
        setZoomInDecimal(scaleForScreen(FIELD_WIDTH, FIELD_HEIGHT, 1500));
        centerScreenOnObject(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
    }, []);

    const homePlayers =
        game_snapshot && game_snapshot.home_team.players
            ? game_snapshot.home_team.players
            : makeDefaultPlayers('HOME', blue('500'));
    const awayPlayers =
        game_snapshot && game_snapshot.away_team.players
            ? game_snapshot.away_team.players
            : makeDefaultPlayers('AWAY', green('500'));

    return (
        <Stage width={size.width!} height={size.height!} ref={stageRef} scaleY={-1}>
            <Layer>
                <FieldKonva />
                {homePlayers.map((player) => (
                    <PlayerKonva key={player.number} player={player} />
                ))}
                {awayPlayers.map((player) => (
                    <PlayerKonva key={player.number} player={player} />
                ))}
            </Layer>
        </Stage>
    );
}

function makeDefaultPlayers(side: Side, color: string): Player[] {
    const top = side === 'HOME' ? FIELD_POINT_1 : FIELD_POINT_2;
    const bottom = side === 'HOME' ? FIELD_POINT_4 : FIELD_POINT_3;

    return Array.from({ length: 11 })
        .map((_, index) =>
            // linearInterpolation2D(FIELD_POINT_1, FIELD_POINT_4, (index + 0.5) / 11),
            linearInterpolation2D(top, bottom, index / 10),
        )
        .map((position, index) => {
            return {
                number: index + 1,
                position,
                color,
                init_position: position,
                team_side: side,
                velocity: {
                    direction: { x: 1, y: 0 },
                    speed: 100,
                },
            } satisfies Player;
        });
}
