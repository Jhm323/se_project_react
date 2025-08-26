import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

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
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        {/* <button type="submit" className="modal__submit" disabled={isLoading}>
          {isLoading ? loadingText : buttonText}
        </button> */}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
