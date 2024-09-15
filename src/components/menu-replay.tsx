import { PauseIcon, PlayIcon, RedoDotIcon, UndoDotIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useReplay } from '@/hooks/use-replay';
import { Slider } from './ui/slider';
import { MenuSettings } from './menu-settings';
import { MenuPrintScreen } from './menu-print-screen';

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
                    <UndoDotIcon className="h-5 w-5" />
                </Button>
                {(state === 'stopped' || state === 'paused') && (
                    <Button size={'icon'} variant={'outline'} onClick={play}>
                        <PlayIcon className="h-5 w-5" />
                    </Button>
                )}
                {state === 'playing' && (
                    <Button size={'icon'} variant={'outline'} onClick={pause}>
                        <PauseIcon className="h-5 w-5" />
                    </Button>
                )}

                <Button
                    size={'icon'}
                    variant={'outline'}
                    onClick={nextTurn}
                    disabled={state != 'playing' && state != 'paused'}
                >
                    <RedoDotIcon className="h-5 w-5" />
                </Button>
            </div>
            <Slider
                defaultValue={[0]}
                max={gameSnapshots.length}
                value={[currentTurn.index]}
                step={1}
                className={'w-full'}
                onValueChange={(values) => {
                    const snapshot = gameSnapshots[values[0]];
                    jumpToTurnUuId(snapshot.uuid);
                }}
            />
            <div className="flex items-center gap-3">
                <MenuPrintScreen />
                <MenuSettings />
            </div>
        </div>
    );
}
