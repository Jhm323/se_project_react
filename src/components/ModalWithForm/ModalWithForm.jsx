import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

function ModalWithForm({ children, title, onClose, isOpen, onSubmit }) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
