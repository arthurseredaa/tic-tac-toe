import React from 'react';

import { BoardContextProvider } from '@context/BoardContext';

import App from './components/App/App';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
  </React.StrictMode>
);
