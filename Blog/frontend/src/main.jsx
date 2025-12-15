import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import Toasts from './components/Toasts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
        <Toasts />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
