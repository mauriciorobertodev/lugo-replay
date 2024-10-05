import { Stage, Layer, Rect } from 'react-konva';
import { FieldKonva } from '@/components/konva/field';
import { useBaseStage } from '@/hooks/use-base-stage';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { PlayerKonva } from './components/konva/player';
import { linearInterpolation2D } from './lib/math';
import { blue, green } from './lib/tailwindcss';
import { BallKonva } from './components/konva/ball';
import { ScoreKonva } from './components/konva/score';
import { FIELD, Player, Side, SPECS, Vector2D, Velocity } from './lugo';
import { Snapshot } from './lugo/snapshot';
// import { useImage } from './hooks/use-image';
// import gramaImage from './assets/grama.jpg';

export function Replay({ game_snapshot }: { game_snapshot: Snapshot | null }) {
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
    }, [showBackground]);

    useEffect(() => {
        setZoomInDecimal(scaleForScreen(SPECS.MAX_X_COORDINATE, SPECS.MAX_Y_COORDINATE, 700));
        centerScreenOnObject(0, 0, SPECS.MAX_X_COORDINATE, SPECS.MAX_Y_COORDINATE);
    }, []);

    const homePlayers =
        game_snapshot && game_snapshot.getHomeTeam().getPlayers()
            ? game_snapshot.getHomeTeam().getPlayers()
            : makeDefaultPlayers(Side.HOME, blue('500'));
    const awayPlayers =
        game_snapshot && game_snapshot.getAwayTeam().getPlayers()
            ? game_snapshot.getAwayTeam().getPlayers()
            : makeDefaultPlayers(Side.AWAY, green('500'));

    // const patternSize = 50;

    // if (!game_snapshot) return null;

    return (
        <div style={{ backgroundColor }}>
            <Stage width={size.width!} height={size.height!} ref={stageRef} scaleY={-1}>
                <Layer scaleY={-1}>
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
                <Layer scaleY={-1}>
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
                    {homePlayers.map((player) => {
                        player.setColor(blue());
                        return <PlayerKonva key={player.getNumber()} player={player} />;
                    })}
                    {awayPlayers.map((player) => {
                        player.setColor(green());
                        return <PlayerKonva key={player.getNumber()} player={player} />;
                    })}
                    {game_snapshot?.getBall() && <BallKonva ball={game_snapshot.getBall()} />}
                    <ScoreKonva
                        home={game_snapshot?.getHomeTeam().getScore() ?? 0}
                        away={game_snapshot?.getAwayTeam().getScore() ?? 0}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

function makeDefaultPlayers(side: Side, color: string): Player[] {
    const top = side === Side.HOME ? FIELD.POINT_1 : FIELD.POINT_2;
    const bottom = side === Side.HOME ? FIELD.POINT_4 : FIELD.POINT_3;

    return Array.from({ length: 11 })
        .map((_, index) => linearInterpolation2D(top, bottom, index / 10))
        .map((position, index) => {
            return new Player({
                number: index + 1,
                position,
                color,
                initPosition: position,
                teamSide: side,
                velocity: new Velocity(new Vector2D(1, 0), 100),
            });
        });
}
