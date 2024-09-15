import { Text } from 'react-konva';
import { FIELD_POINT_CENTER } from '@/lib/specs';
import { white } from '@/lib/tailwindcss';
import { Point } from '@/types/game';

export type PlayerState = {
    number: number;
    color: string;
    position: Point;
    direction: Point;
};

const formatNumber = (number: number, width: number) => {
    const numStr = number.toString();
    return numStr.padStart(width, '0');
};

export function ScoreKonva({ home, away }: { home: number; away: number }) {
    const textWidth = 5000;
    const textHeight = textWidth / 2;

    const maxWidth = Math.max(home.toString().length, away.toString().length);
    const formattedHome = formatNumber(home, maxWidth);
    const formattedAway = formatNumber(away, maxWidth);
    const position = { x: FIELD_POINT_CENTER.x, y: 0 + 700 };

    return (
        <Text
            x={position.x}
            y={position.y}
            width={textWidth}
            height={textHeight}
            offsetX={textWidth / 2}
            offsetY={textHeight / 2 - 15}
            text={`${formattedHome} x ${formattedAway}`}
            // scaleY={-1}
            fill={white(0.1)}
            fontSize={1000}
            align="center"
            verticalAlign="middle"
            fontStyle="bold"
            padding={0}
            lineHeight={100}
        />
    );
}
