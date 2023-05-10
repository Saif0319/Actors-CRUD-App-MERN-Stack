import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ActorsContextProvider } from './context/ActorsContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ActorsContextProvider>
            <App />
        </ActorsContextProvider>
    </AuthContextProvider>
);
