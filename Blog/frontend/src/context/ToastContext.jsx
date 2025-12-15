import { createContext, useCallback, useMemo, useRef, useState } from "react";

export const ToastContext = createContext({ showToast: () => {} });

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const showToast = useCallback((variant, message, timeout = 3000) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, variant, message }]);

    if (timeout > 0) {
      timersRef.current[id] = setTimeout(() => remove(id), timeout);
    }
  }, [remove]);

  const value = useMemo(() => ({ showToast, toasts, remove }), [showToast, toasts, remove]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
