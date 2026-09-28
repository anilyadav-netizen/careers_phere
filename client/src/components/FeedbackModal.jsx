const FeedbackModal = ({
  title,
  message,
  type = "info",
  confirmLabel,
  onConfirm,
  onClose,
}) => {
  const isConfirm = Boolean(onConfirm);

  const tone =
    type === "error"
      ? "text-red-600"
      : type === "success"
        ? "text-emerald-600"
        : "text-[#159FEF]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className={`text-lg font-bold ${tone}`}>{title}</h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          {isConfirm && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm || onClose}
            className="rounded-lg bg-[#30AFFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#159FEF]"
          >
            {confirmLabel || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;