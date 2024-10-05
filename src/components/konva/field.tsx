import { Rect, Line, Circle, Arc, Group } from 'react-konva';
import { white } from '@/lib/tailwindcss';
import { FIELD } from '@/lugo/field';
import { Goal } from '@/lugo/goal';

export function FieldKonva({ strokeWidth = 20 }: { strokeWidth?: number }) {
    const HOME_GOAL = Goal.HOME();
    const AWAY_GOAL = Goal.AWAY();
    return (
        <Group>
            {/* laterais */}
            <Rect
                width={FIELD.MAX_X}
                height={FIELD.MAX_Y}
                stroke={white()}
                x={0}
                y={0}
                strokeWidth={strokeWidth}
            />

            {/* linha central */}
            <Line
                points={[FIELD.POINT_CENTER.getX(), 0, FIELD.POINT_CENTER.getX(), FIELD.MAX_Y]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            {/* centro do campo */}
            <Circle
                x={FIELD.POINT_CENTER.getX()}
                y={FIELD.POINT_CENTER.getY()}
                radius={FIELD.CENTER_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            {/* bolinha central */}
            <Circle
                x={FIELD.POINT_CENTER.getX()}
                y={FIELD.POINT_CENTER.getY()}
                radius={100}
                fill={white()}
            />

            {/* travessões do gol home */}
            <Line
                points={[
                    HOME_GOAL.getTopPole().getX() - 100,
                    HOME_GOAL.getTopPole().getY(),
                    HOME_GOAL.getTopPole().getX() + 100,
                    HOME_GOAL.getTopPole().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    HOME_GOAL.getCenter().getX() - 100,
                    HOME_GOAL.getCenter().getY(),
                    HOME_GOAL.getCenter().getX() + 100,
                    HOME_GOAL.getCenter().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    HOME_GOAL.getBottomPole().getX() - 100,
                    HOME_GOAL.getBottomPole().getY(),
                    HOME_GOAL.getBottomPole().getX() + 100,
                    HOME_GOAL.getBottomPole().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            <Arc
                x={HOME_GOAL.getTopPole().getX()}
                y={HOME_GOAL.getTopPole().getY()}
                angle={90}
                rotation={360}
                innerRadius={FIELD.GOAL_RADIUS - 1}
                outerRadius={FIELD.GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />
            <Arc
                x={HOME_GOAL.getBottomPole().getX()}
                y={HOME_GOAL.getBottomPole().getY()}
                angle={90}
                rotation={-90}
                innerRadius={FIELD.GOAL_RADIUS - 1}
                outerRadius={FIELD.GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />

            <Line
                points={[
                    HOME_GOAL.getTopPole().getX() + FIELD.GOAL_RADIUS,
                    HOME_GOAL.getTopPole().getY(),
                    HOME_GOAL.getBottomPole().getX() + FIELD.GOAL_RADIUS,
                    HOME_GOAL.getBottomPole().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            {/* travessões do gol home */}
            <Line
                points={[
                    AWAY_GOAL.getTopPole().getX() - 100,
                    AWAY_GOAL.getTopPole().getY(),
                    AWAY_GOAL.getTopPole().getX() + 100,
                    AWAY_GOAL.getTopPole().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    AWAY_GOAL.getCenter().getX() - 100,
                    AWAY_GOAL.getCenter().getY(),
                    AWAY_GOAL.getCenter().getX() + 100,
                    AWAY_GOAL.getCenter().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    AWAY_GOAL.getBottomPole().getX() - 100,
                    AWAY_GOAL.getBottomPole().getY(),
                    AWAY_GOAL.getBottomPole().getX() + 100,
                    AWAY_GOAL.getBottomPole().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            <Line
                points={[
                    AWAY_GOAL.getTopPole().getX() - FIELD.GOAL_RADIUS,
                    AWAY_GOAL.getTopPole().getY(),
                    AWAY_GOAL.getBottomPole().getX() - FIELD.GOAL_RADIUS,
                    AWAY_GOAL.getBottomPole().getY(),
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            <Arc
                x={AWAY_GOAL.getTopPole().getX()}
                y={AWAY_GOAL.getTopPole().getY()}
                angle={90}
                rotation={90}
                innerRadius={FIELD.GOAL_RADIUS - 1}
                outerRadius={FIELD.GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />
            <Arc
                x={AWAY_GOAL.getBottomPole().getX()}
                y={AWAY_GOAL.getBottomPole().getY()}
                angle={90}
                rotation={180}
                innerRadius={FIELD.GOAL_RADIUS - 1}
                outerRadius={FIELD.GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />
        </Group>
    );
}
