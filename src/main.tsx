import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BaseStageProvider } from './providers/base-stage-provider.tsx';
import { ReplayProvider } from './providers/replay-provider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReplayProvider>
            <BaseStageProvider>
                <App />
            </BaseStageProvider>
        </ReplayProvider>
    </StrictMode>,
);
