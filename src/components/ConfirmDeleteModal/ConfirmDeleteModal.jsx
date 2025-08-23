import "./ConfirmDeleteModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useModalClose from "../../hooks/useModalClose";

function ConfirmDeleteModal({ activeModal, onClose, onConfirmDelete, card }) {
  const currentUser = useContext(CurrentUserContext);

  const isOpen = activeModal === "confirm-delete";

  // Close modal on ESC or outside click
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`confirm-delete-modal ${
        activeModal === "confirm-delete" ? "modal_opened" : ""
      }`}
    >
      <div className="confirm-delete-modal modal__content">
        <p className="confirm-delete-modal modal__content-text">
          Are you sure you want to delete this Item? This action is
          irreversable.
        </p>

        <button
          onClick={onClose}
          className="confirm-delete-modal modal__close"
          type="button"
        ></button>

        <button
          onClick={() => {
            onConfirmDelete();
            onClose();
          }}
          className="confirm-delete-modal modal__delete-item"
          type="button"
        >
          Yes, Delete Item
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className="confirm-delete-modal modal__cancel"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
