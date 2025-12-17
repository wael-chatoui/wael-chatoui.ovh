import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import { ViewModeProvider } from './context/ViewModeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewModeProvider>
      <App />
    </ViewModeProvider>
  </StrictMode>,
)
