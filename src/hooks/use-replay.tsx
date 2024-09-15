import { ReplayContext } from '@/providers/replay-provider';
import { useContext } from 'react';

export function useReplay() {
    const context = useContext(ReplayContext);
    if (!context) {
        throw new Error('useReplay must be used within a ReplayProvider');
    }
    return context;
}
