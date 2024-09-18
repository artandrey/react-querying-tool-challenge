import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WrappedApp } from './app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WrappedApp />
    </StrictMode>
);
