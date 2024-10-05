import { useReplay } from '@/hooks/use-replay';

import { PiSoccerBallFill } from 'react-icons/pi';
import { GiGoalKeeper } from 'react-icons/gi';

const formatNumber = (number: number, width: number) => {
    const numStr = number.toString();
    return numStr.padStart(width, '0');
};

export function InfoReplay() {
    const { currentGameSnapshot } = useReplay();

    const homeScore = currentGameSnapshot?.getHomeTeam().getScore() ?? 0;
    const awayScore = currentGameSnapshot?.getAwayTeam().getScore() ?? 0;

    const maxWidth = Math.max(homeScore.toString().length, awayScore.toString().length);
    const formattedHomeScore = formatNumber(homeScore, maxWidth);
    const formattedAwayScore = formatNumber(awayScore, maxWidth);
    const currentTurn = currentGameSnapshot?.getTurn() ?? 0;

    return (
        <div className="fixed top-4 mx-4 w-full max-w-4xl grid grid-cols-[200px_1fr_200px] items-center justify-between bg-white text-gray-700 rounded-md px-3 h-12 z-50">
            <div className="font-bold text-lg  whitespace-nowrap">
                # {`${currentTurn}`.padStart(4, '0')}
            </div>
            <div className="flex items-center justify-center gap-2 font-black text-2xl">
                <div className="flex flex-row gap-2 items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-slate-500 font-semibold">HOME</span>
                </div>
                <span>{formattedHomeScore}</span>
                <span>x</span>
                <span>{formattedAwayScore}</span>
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm text-slate-500 font-semibold">AWAY</span>
                    <div className="h-6 w-6 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="grid grid-cols-2 items-center justify-end gap-4">
                <div>
                    {currentGameSnapshot?.getTurnsBallInGoalZone() && (
                        <div
                            data-state={currentGameSnapshot.getTurnsBallInGoalZoneState()}
                            className="flex flex-row gap-1 items-center justify-end data-[state=normal]:text-green-600 data-[state=alert]:text-yellow-600 data-[state=danger]:text-red-600"
                        >
                            <GiGoalKeeper className="h-6 w-6" />
                            <span className="font-bold">
                                {currentGameSnapshot.getTurnsBallInGoalZone()}/t
                            </span>
                        </div>
                    )}
                </div>

                {currentGameSnapshot?.getShotClock() && (
                    <div
                        data-state={currentGameSnapshot.getShotClock().getState()}
                        className="grid grid-cols-[min-content_1fr] gap-1 items-center justify-end data-[state=normal]:text-green-600 data-[state=alert]:text-yellow-600 data-[state=danger]:text-red-600"
                    >
                        <PiSoccerBallFill className="h-6 w-6" />
                        <span className="font-bold">
                            {currentGameSnapshot.getShotClock().getRemainingTurns()}/t
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
