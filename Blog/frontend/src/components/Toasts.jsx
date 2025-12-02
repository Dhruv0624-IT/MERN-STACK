import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const variantClass = (v) => {
  switch (v) {
    case "success": return "text-bg-success";
    case "danger": return "text-bg-danger";
    case "warning": return "text-bg-warning";
    case "info": return "text-bg-info";
    default: return "text-bg-secondary";
  }
};

const Toasts = () => {
  const { toasts, remove } = useContext(ToastContext);
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast align-items-center show ${variantClass(t.variant)}`} role="alert">
          <div className="d-flex">
            <div className="toast-body">{t.message}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => remove(t.id)}></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
