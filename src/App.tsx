import { FileDropzone } from './components/ui/dropzone';
import { Progress } from './components/ui/progress';
import { Loader2Icon } from 'lucide-react';
import { Replay } from './replay';
import { MenuReplay } from './components/menu-replay';
import { useReplay } from './hooks/use-replay';

function App() {
    const { handleDrop, progress, currentGameSnapshot, fileStatus } = useReplay();

    return (
        <div className="h-full w-full flex items-center justify-center max-h-full ">
            {fileStatus === 'idle' && (
                <div className="max-w-lg w-full">
                    <FileDropzone onDrop={handleDrop} />
                </div>
            )}
            {fileStatus === 'loading' && (
                <div className="max-w-lg w-full flex flex-col items-center justify-center gap-4">
                    <div className="text-5xl font-bold">{progress}%</div>
                    <Progress value={progress} className="w-full h-4" />
                    <div className="flex gap-3 items-center">
                        <Loader2Icon className="animate-spin h-4 w-4" /> Carregando...
                    </div>
                </div>
            )}
            {fileStatus === 'completed' && (
                // <div className="max-w-lg w-full">
                //     {fileName} - {gameSnapshots.length} -{' '}
                //     {(new Blob([JSON.stringify(gameSnapshots)]).size / (1024 * 1024)).toFixed(2)} MB
                // </div>
                <>
                    <Replay game_snapshot={currentGameSnapshot} />
                    <MenuReplay />
                </>
            )}
        </div>
    );
}

export default App;
