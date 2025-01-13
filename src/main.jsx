import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import UnityPage from './pages/UnityPage/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnityPage />
  </StrictMode>,
);
