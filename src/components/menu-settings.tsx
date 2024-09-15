import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { BoltIcon } from 'lucide-react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Description } from './ui/description';
import { useReplay } from '@/hooks/use-replay';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useBaseStage } from '@/hooks/use-base-stage';

const gameSpeedValues = [0.25, 0.5, 0.75, 1, 2, 3, 4];

export function MenuSettings() {
    const { gameSpeed, setGameSpeed } = useReplay();
    const { backgroundColor, setBackgroundColor } = useBaseStage();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'} variant={'outline'}>
                    <BoltIcon className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configurações</DialogTitle>
                    <DialogDescription>
                        ATENÇÃO: Para gravar os movimentos é necessário permissão.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label className="flex items-center justify-between">
                            <span>Velocidade do jogo</span>
                            <span>{gameSpeed}x</span>
                        </Label>
                        <Slider
                            defaultValue={[gameSpeedValues.findIndex((v) => v === gameSpeed) ?? 3]}
                            max={gameSpeedValues.length - 1}
                            step={1}
                            onValueChange={(value) => setGameSpeed(gameSpeedValues[value[0]])}
                        />
                        <Description>A velocidade será alterada no próximo 'play'</Description>
                    </div>
                    <hr />
                    <div className="space-y-2">
                        <Label className="flex items-center justify-between">
                            <span>Cor de fundo</span>
                            <Popover>
                                <PopoverTrigger
                                    style={{ backgroundColor }}
                                    className="h-8 w-8 rounded-full border"
                                ></PopoverTrigger>
                                <PopoverContent className="flex flex-col items-center justify-center gap-4">
                                    <HexColorPicker
                                        color={backgroundColor}
                                        onChange={setBackgroundColor}
                                    />
                                    <span>{backgroundColor}</span>
                                </PopoverContent>
                            </Popover>
                        </Label>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
