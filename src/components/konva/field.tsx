import { Rect, Line, Circle, Arc } from 'react-konva';
import {
    AWAY_GOAL_BOTTOM,
    AWAY_GOAL_CENTER,
    AWAY_GOAL_TOP,
    BALL_RADIUS,
    FIELD_CENTER_RADIUS,
    FIELD_HEIGHT,
    FIELD_POINT_CENTER,
    FIELD_WIDTH,
    GOAL_RADIUS,
    HOME_GOAL_BOTTOM,
    HOME_GOAL_CENTER,
    HOME_GOAL_TOP,
} from '@/lib/specs';
import { white } from '@/lib/tailwindcss';

export function FieldKonva({ strokeWidth = 20 }: { strokeWidth?: number }) {
    return (
        <>
            {/* laterais */}
            <Rect
                width={FIELD_WIDTH}
                height={FIELD_HEIGHT}
                stroke={white()}
                x={0}
                y={0}
                strokeWidth={strokeWidth}
            />

            {/* linha central */}
            <Line
                points={[FIELD_POINT_CENTER.x, 0, FIELD_POINT_CENTER.x, FIELD_HEIGHT]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            {/* centro do campo */}
            <Circle
                x={FIELD_POINT_CENTER.x}
                y={FIELD_POINT_CENTER.y}
                radius={FIELD_CENTER_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            {/* bolinha central */}
            <Circle
                x={FIELD_POINT_CENTER.x}
                y={FIELD_POINT_CENTER.y}
                radius={BALL_RADIUS / 2}
                fill={white()}
            />

            {/* travessões do gol home */}
            <Line
                points={[
                    HOME_GOAL_TOP.x - 100,
                    HOME_GOAL_TOP.y,
                    HOME_GOAL_TOP.x + 100,
                    HOME_GOAL_TOP.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    HOME_GOAL_CENTER.x - 100,
                    HOME_GOAL_CENTER.y,
                    HOME_GOAL_CENTER.x + 100,
                    HOME_GOAL_CENTER.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    HOME_GOAL_BOTTOM.x - 100,
                    HOME_GOAL_BOTTOM.y,
                    HOME_GOAL_BOTTOM.x + 100,
                    HOME_GOAL_BOTTOM.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            <Arc
                x={HOME_GOAL_TOP.x}
                y={HOME_GOAL_TOP.y}
                angle={90}
                rotation={360}
                innerRadius={GOAL_RADIUS - 1}
                outerRadius={GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />
            <Arc
                x={HOME_GOAL_BOTTOM.x}
                y={HOME_GOAL_BOTTOM.y}
                angle={90}
                rotation={-90}
                innerRadius={GOAL_RADIUS - 1}
                outerRadius={GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />

            <Line
                points={[
                    HOME_GOAL_TOP.x + GOAL_RADIUS,
                    HOME_GOAL_TOP.y,
                    HOME_GOAL_BOTTOM.x + GOAL_RADIUS,
                    HOME_GOAL_BOTTOM.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            {/* travessões do gol home */}
            <Line
                points={[
                    AWAY_GOAL_TOP.x - 100,
                    AWAY_GOAL_TOP.y,
                    AWAY_GOAL_TOP.x + 100,
                    AWAY_GOAL_TOP.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    AWAY_GOAL_CENTER.x - 100,
                    AWAY_GOAL_CENTER.y,
                    AWAY_GOAL_CENTER.x + 100,
                    AWAY_GOAL_CENTER.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />
            <Line
                points={[
                    AWAY_GOAL_BOTTOM.x - 100,
                    AWAY_GOAL_BOTTOM.y,
                    AWAY_GOAL_BOTTOM.x + 100,
                    AWAY_GOAL_BOTTOM.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            <Line
                points={[
                    AWAY_GOAL_TOP.x - GOAL_RADIUS,
                    AWAY_GOAL_TOP.y,
                    AWAY_GOAL_BOTTOM.x - GOAL_RADIUS,
                    AWAY_GOAL_BOTTOM.y,
                ]}
                stroke={white()}
                strokeWidth={strokeWidth}
            />

            <Arc
                x={AWAY_GOAL_TOP.x}
                y={AWAY_GOAL_TOP.y}
                angle={90}
                rotation={90}
                innerRadius={GOAL_RADIUS - 1}
                outerRadius={GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />
            <Arc
                x={AWAY_GOAL_BOTTOM.x}
                y={AWAY_GOAL_BOTTOM.y}
                angle={90}
                rotation={180}
                innerRadius={GOAL_RADIUS - 1}
                outerRadius={GOAL_RADIUS}
                stroke={white()}
                strokeWidth={strokeWidth}
                fillEnabled={false}
            />
        </>
    );
}
