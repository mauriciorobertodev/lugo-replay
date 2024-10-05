import { Text } from 'react-konva';
import { white } from '@/lib/tailwindcss';
import { FIELD, Point, SPECS } from '@/lugo';

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
    const position = { x: FIELD.POINT_CENTER.getX(), y: SPECS.MAX_Y_COORDINATE - 700 };

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
            scaleY={-1}
        />
    );
}
