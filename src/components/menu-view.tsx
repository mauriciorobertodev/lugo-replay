import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EyeIcon, Gamepad2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { useReplay } from '@/hooks/use-replay';
import { PiSoccerBallFill } from 'react-icons/pi';

export function MenuReplayView() {
    const { setReplayView, replayView } = useReplay();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <EyeIcon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={replayView === 'game'}
                    onClick={() => setReplayView('game')}
                >
                    <Gamepad2Icon className="mr-2 h-4 w-4" />
                    <span>Ver jogo</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={replayView === 'ball-heatmap'}
                    onClick={() => setReplayView('ball-heatmap')}
                >
                    <PiSoccerBallFill className="mr-2 h-4 w-4" />
                    <span>Ver rastro da bola</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
