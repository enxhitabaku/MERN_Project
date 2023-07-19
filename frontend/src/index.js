import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthenticationContextProvider} from "./shared/context/AuthenticationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthenticationContextProvider>
            <App/>
        </AuthenticationContextProvider>
    </React.StrictMode>
);
