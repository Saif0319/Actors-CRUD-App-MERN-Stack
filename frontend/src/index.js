import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ActorsContextProvider } from './context/ActorsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ActorsContextProvider>
        <App />
    </ActorsContextProvider>
    
);
