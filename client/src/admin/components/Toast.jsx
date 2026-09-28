// src/admin/components/Toast.jsx
import { AlertCircle, CheckCircle, X, XCircle } from "lucide-react";
import { useEffect } from "react";

const Toast = ({
  message,
  type = "success", // success, error, info, warning
  duration = 3000,
  onClose = () => {},
  isVisible = true,
}) => {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible || !message) return null;

  const typeConfig = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: XCircle,
      iconColor: "text-red-500",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: AlertCircle,
      iconColor: "text-blue-500",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: AlertCircle,
      iconColor: "text-yellow-500",
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top fade-in">
      <div
        className={`${config.bg} ${config.border} ${config.text} border rounded-lg p-4 shadow-lg flex items-start gap-3`}
      >
        <Icon className={`${config.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${config.text} hover:opacity-60 transition-opacity flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
