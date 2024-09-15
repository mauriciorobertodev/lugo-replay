import { createContext, PropsWithChildren } from 'react';

import { useState } from 'react';
import { decodeGzipBase64 } from '@/lib/utils';
import { GameSnapshot } from '@/types/game';

const CHUNK_SIZE = 64 * 1024; // (64 KB)

export type ReplayState = 'playing' | 'stopped';

export type FileStatus = 'idle' | 'loading' | 'completed';

type ReplayValues = {
    state: ReplayState;
    setState: React.Dispatch<React.SetStateAction<ReplayState>>;
    fileStatus: FileStatus;
    progress: number;
    currentGameSnapshot: GameSnapshot | null;
    handleDrop: (files: File[]) => void;
    jumpToTurn(turn: number): void;
    play(): void;
};

export const ReplayContext = createContext<ReplayValues | undefined>(undefined);

export function ReplayProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<ReplayState>('stopped');

    const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
    const [progress, setProgress] = useState(0);
    // const [fileName, setFileName] = useState('');
    const [gameSnapshots, setGameSnapshots] = useState<GameSnapshot[]>([]);
    const [currentGameSnapshot, setCurrentGameSnapshot] = useState<GameSnapshot | null>(null);

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
                    setFileStatus('completed');
                }
            }
        };

        reader.onerror = (error) => {
            // TODO: exibir um toast de erro
            console.error('Erro ao ler o arquivo:', error);
            setFileStatus('idle');
        };

        const readNextChunk = () => {
            const blob = file.slice(offset, offset + CHUNK_SIZE);
            reader.readAsArrayBuffer(blob);
        };

        readNextChunk();
    };

    const handleDrop = (files: File[]) => {
        if (files.length > 0) {
            // setFileName(files[0].name);
            setFileStatus('loading');
            setProgress(0);
            setGameSnapshots([]);
            readFileInChunks(files[0]);
        }
    };

    function jumpToTurn(turn: number): void {
        setCurrentGameSnapshot(gameSnapshots.filter((g) => g.turn === turn)[0]);
    }

    function play() {
        if (gameSnapshots.length === 0) return;

        let currentTurnIndex = 0;

        setState('playing'); // Atualiza o estado para 'playing'

        const intervalId = setInterval(() => {
            if (currentTurnIndex >= gameSnapshots.length) {
                clearInterval(intervalId);
                setState('stopped'); // Atualiza o estado para 'stopped' quando terminar
                return;
            }

            setCurrentGameSnapshot(gameSnapshots[currentTurnIndex]); // Atualiza o snapshot atual
            currentTurnIndex++; // Passa para o próximo turno
        }, 50); // Define o intervalo de 1 segundo
    }

    return (
        <ReplayContext.Provider
            value={{
                state,
                setState,
                fileStatus,
                progress,
                currentGameSnapshot,

                handleDrop,
                jumpToTurn,
                play,
            }}
        >
            {children}
        </ReplayContext.Provider>
    );
}
