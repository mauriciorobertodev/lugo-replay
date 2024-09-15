import { createContext, PropsWithChildren } from 'react';
import { useState } from 'react';
import { decodeGzipBase64, randomUUID } from '@/lib/utils';
import { GameSnapshot } from '@/types/game';

const CHUNK_SIZE = 64 * 1024; // (64 KB)

export type ReplayState = 'playing' | 'paused' | 'stopped';

export type FileStatus = 'idle' | 'loading' | 'completed';

type ReplayValues = {
    state: ReplayState;
    setState: React.Dispatch<React.SetStateAction<ReplayState>>;
    fileStatus: FileStatus;
    progress: number;
    currentGameSnapshot: GameSnapshot | null;
    gameSnapshots: GameSnapshot[];
    gameSpeed: number;
    setGameSpeed: React.Dispatch<React.SetStateAction<number>>;
    currentTurn: {
        index: number;
        uuid: string;
    };
    jumpToTurnUuId(turnUuid: string): void;
    handleDrop: (files: File[]) => void;
    jumpToTurn(turn: number): void;
    play(): void;
    pause(): void;
    stop(): void;
    nextTurn(): void;
    previousTurn(): void;
};

export const ReplayContext = createContext<ReplayValues | undefined>(undefined);

const intervalMap: { [key: number]: number } = {
    0.25: 200, // 200 ms para 0.25x
    0.5: 100, // 100 ms para 0.5x
    0.75: 75, // 75 ms para 0.75x
    1: 50, // 50 ms para 1x
    2: 25, // 25 ms para 2x
    3: 17, // 17 ms para 3x
    4: 12, // 12 ms para 4x
};

export function ReplayProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<ReplayState>('stopped');
    const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [gameSnapshots, setGameSnapshots] = useState<GameSnapshot[]>([]);
    const [currentGameSnapshot, setCurrentGameSnapshot] = useState<GameSnapshot | null>(null);
    const [gameSpeed, setGameSpeed] = useState(1);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [currentTurn, setCurrentTurn] = useState<{ index: number; uuid: string }>({
        index: 0,
        uuid: gameSnapshots[0]?.uuid ?? '',
    });

    const readFileInChunks = (file: File) => {
        let offset = 0;
        const totalSize = file.size;
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target?.result) {
                const chunk = new Uint8Array(event.target.result as ArrayBuffer);
                const chunkText = new TextDecoder().decode(chunk);

                const lines = chunkText.split('\n');
                const validLines = lines
                    .map((line) => {
                        const decoded = decodeGzipBase64(line);
                        if (
                            decoded &&
                            decoded.game_snapshot &&
                            decoded.game_snapshot.state != 'PLAYING'
                        ) {
                            decoded.game_snapshot.uuid = randomUUID();
                            return decoded.game_snapshot;
                        }
                    })
                    .filter((line) => !!line);

                setGameSnapshots((oldGameSnapshots) => [...oldGameSnapshots, ...validLines]);

                const newProgress = Math.min(Math.round((offset / totalSize) * 100), 100);
                setProgress(newProgress);

                offset += CHUNK_SIZE;
                if (offset < totalSize) {
                    readNextChunk();
                } else {
                    setFileStatus('completed');
                }
            }
        };

        reader.onerror = (error) => {
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
            setFileStatus('loading');
            setProgress(0);
            setGameSnapshots([]);
            setCurrentTurn({ index: 0, uuid: gameSnapshots[0]?.uuid ?? '' });
            readFileInChunks(files[0]);
        }
    };

    function jumpToTurn(turn: number): void {
        const index = gameSnapshots.findIndex((g) => g.turn === turn);
        if (index !== -1) {
            setCurrentTurn({ index, uuid: gameSnapshots[index].uuid });
            setCurrentGameSnapshot(gameSnapshots[index]);
        }
    }

    function jumpToTurnUuId(turnUuid: string): void {
        const index = gameSnapshots.findIndex((g) => g.uuid === turnUuid);
        if (index !== -1) {
            setCurrentTurn({ index, uuid: gameSnapshots[index].uuid });
            setCurrentGameSnapshot(gameSnapshots[index]);
        }
    }

    function play() {
        if (gameSnapshots.length === 0) return;

        if (state === 'playing') return;

        setState('playing');

        const id = setInterval(() => {
            if (currentTurn.index >= gameSnapshots.length - 1) {
                clearInterval(id);
                setState('stopped');
                return;
            }

            setCurrentTurn((prevCurrentTurn) => {
                const nextIndex = prevCurrentTurn.index + 1;
                setCurrentGameSnapshot(gameSnapshots[nextIndex]);
                return { index: nextIndex, uuid: gameSnapshots[nextIndex].uuid };
            });
        }, intervalMap[gameSpeed]);

        setIntervalId(id);
    }

    function pause() {
        if (intervalId) {
            clearInterval(intervalId);
            setState('paused');
        }
    }

    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            setState('stopped');
            setCurrentTurn({ index: 0, uuid: gameSnapshots[0].uuid });
            setCurrentGameSnapshot(gameSnapshots[0] || null);
        }
    }

    function nextTurn() {
        if (currentTurn.index < gameSnapshots.length - 1) {
            setCurrentTurn((prevCurrentTurn) => {
                const nextIndex = prevCurrentTurn.index + 1;
                setCurrentGameSnapshot(gameSnapshots[nextIndex]);
                return { index: nextIndex, uuid: gameSnapshots[nextIndex].uuid };
            });
        }
    }

    function previousTurn() {
        if (currentTurn.index > 0) {
            setCurrentTurn((prevCurrentTurn) => {
                const prevIndex = prevCurrentTurn.index - 1;
                setCurrentGameSnapshot(gameSnapshots[prevIndex]);
                return { index: prevIndex, uuid: gameSnapshots[prevIndex].uuid };
            });
        }
    }

    return (
        <ReplayContext.Provider
            value={{
                state,
                setState,
                currentTurn,
                gameSpeed,
                setGameSpeed,
                fileStatus,
                progress,
                gameSnapshots,
                currentGameSnapshot,
                handleDrop,
                jumpToTurn,
                play,
                pause,
                stop,
                nextTurn,
                previousTurn,
                jumpToTurnUuId,
            }}
        >
            {children}
        </ReplayContext.Provider>
    );
}
