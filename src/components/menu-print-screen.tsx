import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBaseStage } from '@/hooks/use-base-stage';
import { ImageDownIcon } from 'lucide-react';
import { Button } from './ui/button';

export function MenuPrintScreen() {
    const { printScreen } = useBaseStage();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <ImageDownIcon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem className="cursor-pointer" onClick={() => printScreen(true)}>
                    <ImageDownIcon className="mr-2 h-4 w-4" />
                    <span>Com background</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => printScreen(false)}>
                    <ImageDownIcon className="mr-2 h-4 w-4" />
                    <span>Sem background</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
