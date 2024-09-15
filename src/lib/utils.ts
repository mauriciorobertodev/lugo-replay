import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import pako from 'pako';
import { GameSnapshot } from '@/types/game';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function decodeGzipBase64(encoded: string): { game_snapshot: GameSnapshot } | null {
    try {
        // Converte base64 para ArrayBuffer
        const binaryString = atob(encoded);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Descompacta usando pako
        const decompressed = pako.ungzip(bytes, { to: 'string' });

        // Converte o resultado descompactado para um objeto JavaScript
        return JSON.parse(decompressed);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
}

export function randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
