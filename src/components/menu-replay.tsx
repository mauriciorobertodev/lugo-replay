import { PlayIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useReplay } from '@/hooks/use-replay';

export function MenuReplay() {
    const { play } = useReplay();

    return (
        <div className="fixed bottom-4 mx-4 w-full max-w-4xl flex items-center justify-center bg-white text-gray-700 rounded-md p-4">
            <Button size={'icon'} variant={'outline'} onClick={play}>
                <PlayIcon />
            </Button>
        </div>
    );
}
