import { createContext, useCallback, useMemo, useState } from "react";

export const ToastContext = createContext({ showToast: () => {} });

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((variant, message, timeout = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, variant, message }]);
    if (timeout > 0) setTimeout(() => remove(id), timeout);
  }, [remove]);

  const value = useMemo(() => ({ showToast, toasts, remove }), [showToast, toasts, remove]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
