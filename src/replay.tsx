import { Stage, Layer, Rect, Circle } from 'react-konva';
import { FieldKonva } from '@/components/konva/field';
import { useBaseStage } from '@/hooks/use-base-stage';
import { Fragment, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { PlayerKonva } from './components/konva/player';
import { linearInterpolation2D } from './lib/math';
import { blue, green, white } from './lib/tailwindcss';
import { BallKonva } from './components/konva/ball';
import { FIELD, Player, Side, SPECS, Vector2D, Velocity } from './lugo';
import { useReplay } from './hooks/use-replay';
import { BallInfoKonva } from './components/konva/ball-info';
import { BallDirectionKonva } from './components/konva/ball-direction';
import { PlayerInfoKonva } from './components/konva/player-info';
import { GoalkeeperKonva } from './components/konva/goalkeeper';
import { BallGoalZoneStateKonva } from './components/konva/ball-goal-zone-state';

export function Replay() {
    const {
        setZoomInDecimal,
        stageRef,
        scaleForScreen,
        centerScreenOnObject,
        backgroundColor,
        showBackground,
    } = useBaseStage();
    const size = useWindowSize();
    const {
        currentGameSnapshot,
        gameSnapshots,
        replayView,
        showBallInfo,
        showBallDirection,
        showHomeInfo,
        showAwayInfo,
    } = useReplay();

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
        currentGameSnapshot && currentGameSnapshot.getHomeTeam().getPlayers()
            ? currentGameSnapshot.getHomeTeam().getPlayers()
            : makeDefaultPlayers(Side.HOME, blue('500'));
    const awayPlayers =
        currentGameSnapshot && currentGameSnapshot.getAwayTeam().getPlayers()
            ? currentGameSnapshot.getAwayTeam().getPlayers()
            : makeDefaultPlayers(Side.AWAY, green('500'));

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
                <Layer scaleY={-1}>
                    <FieldKonva />

                    {replayView === 'ball-heatmap' && (
                        <Fragment>
                            {gameSnapshots.map((snapshot) => {
                                if (snapshot.getTurn() <= (currentGameSnapshot?.getTurn() ?? 0)) {
                                    return (
                                        <Circle
                                            key={snapshot.getUuid()}
                                            x={snapshot.getBall().getPosition().getX()}
                                            y={snapshot.getBall().getPosition().getY()}
                                            height={SPECS.BALL_SIZE}
                                            width={SPECS.BALL_SIZE}
                                            fill={white(0.04)}
                                        />
                                    );
                                }
                            })}
                        </Fragment>
                    )}

                    {replayView === 'game' && (
                        <Fragment>
                            {homePlayers.map((player) => {
                                player.setColor(blue());

                                return (
                                    <Fragment key={player.getNumber()}>
                                        {player.isGoalkeeper() ? (
                                            <GoalkeeperKonva player={player} />
                                        ) : (
                                            <PlayerKonva player={player} />
                                        )}
                                        {showHomeInfo && (
                                            <PlayerInfoKonva
                                                key={`home-player-info-${player.getNumber()}`}
                                                player={player}
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                            {awayPlayers.map((player) => {
                                player.setColor(green());
                                return (
                                    <Fragment key={player.getNumber()}>
                                        {player.isGoalkeeper() ? (
                                            <GoalkeeperKonva player={player} />
                                        ) : (
                                            <PlayerKonva player={player} />
                                        )}

                                        {showAwayInfo && (
                                            <PlayerInfoKonva
                                                key={`away-player-info-${player.getNumber()}`}
                                                player={player}
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    )}

                    {currentGameSnapshot?.getBall() && (
                        <Fragment>
                            {showBallDirection && (
                                <BallDirectionKonva ball={currentGameSnapshot.getBall()} />
                            )}
                            <BallKonva ball={currentGameSnapshot.getBall()} />
                            <BallGoalZoneStateKonva />
                            {showBallInfo && <BallInfoKonva ball={currentGameSnapshot.getBall()} />}
                        </Fragment>
                    )}
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
