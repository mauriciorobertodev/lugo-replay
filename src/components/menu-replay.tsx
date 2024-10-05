import { Button } from './ui/button';
import { useReplay } from '@/hooks/use-replay';
import { Slider } from './ui/slider';
import { MenuSettings } from './menu-settings';
import { MenuPrintScreen } from './menu-print-screen';
import { MenuReplayView } from './menu-view';
import { LuUndoDot, LuPlay, LuPause, LuRedoDot } from 'react-icons/lu';

export function MenuReplay() {
    const {
        play,
        pause,
        previousTurn,
        nextTurn,
        state,
        gameSnapshots,
        jumpToTurnUuId,
        currentTurn,
    } = useReplay();

    return (
        <div className="fixed bottom-4 mx-4 w-full max-w-4xl grid grid-cols-[min-content_1fr_min-content] items-center gap-6 bg-white text-gray-700 rounded-md p-3">
            <div className="flex items-center gap-3">
                <Button
                    size={'icon'}
                    variant={'outline'}
                    onClick={previousTurn}
                    disabled={state != 'playing' && state != 'paused'}
                >
                    <LuUndoDot className="h-5 w-5" />
                </Button>
                {(state === 'stopped' || state === 'paused') && (
                    <Button size={'icon'} variant={'outline'} onClick={play}>
                        <LuPlay className="h-5 w-5" />
                    </Button>
                )}
                {state === 'playing' && (
                    <Button size={'icon'} variant={'outline'} onClick={pause}>
                        <LuPause className="h-5 w-5" />
                    </Button>
                )}

                <Button
                    size={'icon'}
                    variant={'outline'}
                    onClick={nextTurn}
                    disabled={state != 'playing' && state != 'paused'}
                >
                    <LuRedoDot className="h-5 w-5" />
                </Button>
            </div>
            <Slider
                defaultValue={[0]}
                max={gameSnapshots.length - 1}
                value={[currentTurn.index]}
                step={1}
                className={'w-full'}
                onValueChange={(values) => {
                    const snapshot = gameSnapshots[values[0]];
                    jumpToTurnUuId(snapshot.getUuid());
                }}
            />
            <div className="flex items-center gap-3">
                <MenuPrintScreen />
                <MenuReplayView />
                <MenuSettings />
            </div>
        </div>
    );
}
