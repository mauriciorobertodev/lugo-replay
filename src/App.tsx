import { useState } from 'react';
import { FileDropzone } from './components/ui/dropzone';
import { Progress } from './components/ui/progress';
import { decodeGzipBase64 } from './lib/utils';
import { GameSnapshot } from './types/game';
import { Loader2Icon } from 'lucide-react';

const CHUNK_SIZE = 64 * 1024; // (64 KB)

function App() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'completed'>('idle');
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const [gameSnapshots, setGameSnapshots] = useState<GameSnapshot[]>([]);

    const readFileInChunks = (file: File) => {
        let offset = 0;
        const totalSize = file.size;
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target?.result) {
                const chunk = new Uint8Array(event.target.result as ArrayBuffer);
                const chunkText = new TextDecoder().decode(chunk);

                const lines = chunkText.split('\n');
                // lines.forEach((line) => console.log(line));

                const validLines = lines
                    .map((line) => {
                        const decoded = decodeGzipBase64(line);
                        if (
                            decoded &&
                            decoded.game_snapshot &&
                            decoded.game_snapshot.state != 'PLAYING'
                        ) {
                            return decoded.game_snapshot;
                        }
                    })
                    .filter((line) => !!line);

                setGameSnapshots((oldGameSnapshots) => {
                    return [...oldGameSnapshots, ...validLines];
                });

                const newProgress = Math.min(Math.round((offset / totalSize) * 100), 100);
                setProgress(newProgress);

                offset += CHUNK_SIZE;
                if (offset < totalSize) {
                    readNextChunk();
                } else {
                    // TODO: exibir um toast de sucesso
                    setStatus('completed');
                }
            }
        };

        reader.onerror = (error) => {
            // TODO: exibir um toast de erro
            console.error('Erro ao ler o arquivo:', error);
            setStatus('idle');
        };

        const readNextChunk = () => {
            const blob = file.slice(offset, offset + CHUNK_SIZE);
            reader.readAsArrayBuffer(blob);
        };

        readNextChunk();
    };

    const handleDrop = (files: File[]) => {
        if (files.length > 0) {
            setFileName(files[0].name);
            setStatus('loading');
            setProgress(0);
            setGameSnapshots([]);
            readFileInChunks(files[0]);
        }
    };

    return (
        <div className="h-full w-full flex items-center justify-center max-h-full ">
            {status === 'idle' && (
                <div className="max-w-lg w-full">
                    <FileDropzone onDrop={handleDrop} />
                </div>
            )}
            {status === 'loading' && (
                <div className="max-w-lg w-full flex flex-col items-center justify-center gap-4">
                    <Progress value={progress} className="w-full h-4" />
                    <div className="flex gap-3 items-center">
                        <Loader2Icon className="animate-spin h-4 w-4" /> Carregando...
                    </div>
                </div>
            )}
            {status === 'completed' && (
                <div className="max-w-lg w-full">
                    {fileName} - {gameSnapshots.length} -{' '}
                    {(new Blob([JSON.stringify(gameSnapshots)]).size / (1024 * 1024)).toFixed(2)} MB
                </div>
            )}
        </div>
    );
}

export default App;
