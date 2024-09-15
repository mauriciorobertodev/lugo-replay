import { Stage, Layer, Rect } from 'react-konva';
import { FieldKonva } from '@/components/konva/field';
import { useBaseStage } from '@/hooks/use-base-stage';
import { useEffect, useState } from 'react';
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
import { BallKonva } from './components/konva/ball';
import { ScoreKonva } from './components/konva/score';
// import { useImage } from './hooks/use-image';
// import gramaImage from './assets/grama.jpg';

export function Replay({ game_snapshot }: { game_snapshot: GameSnapshot | null }) {
    // const [showGrama, setShowGrama] = useState(false);
    // const image = useImage(gramaImage);
    const {
        setZoomInDecimal,
        stageRef,
        scaleForScreen,
        centerScreenOnObject,
        backgroundColor,
        showBackground,
    } = useBaseStage();
    const size = useWindowSize();

    const [backgroundProps, setBackgroundProps] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (stageRef.current) {
            const stage = stageRef.current;
            const scaleX = stage.scaleX();
            const scaleY = stage.scaleY();
            const stageWidth = stage.width();
            const stageHeight = stage.height();
            const stageX = stage.x();
            const stageY = stage.y();

            setBackgroundProps({
                x: -stageX / scaleX,
                y: -stageY / scaleY,
                width: stageWidth / scaleX,
                height: stageHeight / scaleY,
            });
        }

        // console.log(image);
        // if (image) {
        //     setShowGrama(true);
        // }
    }, [showBackground]);

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

    // const patternSize = 50;

    return (
        <div style={{ backgroundColor }}>
            <Stage width={size.width!} height={size.height!} ref={stageRef} scaleY={-1}>
                <Layer>
                    {showBackground && (
                        <Rect
                            x={backgroundProps.x}
                            y={backgroundProps.y}
                            width={backgroundProps.width}
                            height={backgroundProps.height}
                            fill={backgroundColor}
                        />
                    )}
                </Layer>
                <Layer>
                    {/* {image && showGrama && (
                        <Image
                            x={backgroundProps.x}
                            y={backgroundProps.y}
                            width={backgroundProps.width}
                            height={backgroundProps.height}
                            image={image}
                            fillPatternImage={image}
                            fillPatternRepeat="repeat"
                            fillPatternScaleX={backgroundProps.width / patternSize}
                            fillPatternScaleY={backgroundProps.height / patternSize}
                        />
                    )} */}
                    <FieldKonva />
                    {homePlayers.map((player) => (
                        <PlayerKonva key={player.number} player={player} />
                    ))}
                    {awayPlayers.map((player) => (
                        <PlayerKonva key={player.number} player={player} />
                    ))}
                    {game_snapshot?.ball && <BallKonva ball={game_snapshot.ball} />}
                    <ScoreKonva
                        home={game_snapshot?.home_team.score ?? 0}
                        away={game_snapshot?.away_team.score ?? 0}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

function makeDefaultPlayers(side: Side, color: string): Player[] {
    const top = side === 'HOME' ? FIELD_POINT_1 : FIELD_POINT_2;
    const bottom = side === 'HOME' ? FIELD_POINT_4 : FIELD_POINT_3;

    return Array.from({ length: 11 })
        .map((_, index) => linearInterpolation2D(top, bottom, index / 10))
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
