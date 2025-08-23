import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({ name, onClose, children, isOpen }) => {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Overlay click handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      {" "}
      <div className="modal__content">
        {children}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
};
