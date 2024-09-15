import { BaseStageContext } from '@/providers/base-stage-provider';
import { useContext } from 'react';

export function useBaseStage() {
    const context = useContext(BaseStageContext);
    if (!context) {
        throw new Error('useBaseStage must be used within a BaseStageProvider');
    }
    return context;
}
