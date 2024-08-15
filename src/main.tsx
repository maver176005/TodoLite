import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './TodoApp';
import './index.css'; // Используем глобальные стили для всего приложения

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
