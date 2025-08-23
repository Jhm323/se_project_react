import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";
import { useEffect } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isLoading = false,
  loadingText = "Saving...",
}) {
  // centralized Escape + overlay close handling, using `isOpen` and the function for closing modals
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
          disabled={isLoading}
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button className="modal__submit" type="submit" disabled={isLoading}>
            {isLoading ? loadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
