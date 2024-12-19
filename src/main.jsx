import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.scss';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './Components/ErrorFallBack/ErrorFallBack.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <App />
  </React.StrictMode>
);
