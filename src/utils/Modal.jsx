import { useEffect } from "react";

export const  Modal =({
  isOpen,
  onClose,
  children,
  closeOnOutside = true,
  showCloseButton = false,
  maxWidth = "max-w-md",
}) => {
  // fermer avec ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (closeOnOutside && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/96 flex items-center justify-center z-50"
    >
      <div
        className={`bg-white p-6 rounded-2xl shadow-lg w-[90%] ${maxWidth} relative`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500"
          >
            ✕
          </button>
        )}

        {children}
      </div>
    </div>
  );
}