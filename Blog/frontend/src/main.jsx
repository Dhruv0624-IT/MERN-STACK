import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
<<<<<<< HEAD
=======
import { ToastProvider } from './context/ToastContext.jsx'
import Toasts from './components/Toasts.jsx'
>>>>>>> bf97954 (updated Back-End Projects)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
<<<<<<< HEAD
      <App />
=======
      <ToastProvider>
        <App />
        <Toasts />
      </ToastProvider>
>>>>>>> bf97954 (updated Back-End Projects)
    </AuthProvider>
  </StrictMode>,
)
