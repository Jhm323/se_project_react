import "./DeleteConformationModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function DeleteConformationModal({ activeModal, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <p className="modal__content-text">
          Are you sure you want to delete this Item? This action is
          irreversable.
        </p>

        <button
          onClick={onClose}
          className="modal__close modal__close-cancel-confirm"
          type="button"
        ></button>

        <button
          onClick={() => {
            onDeleteCard(card._id);
            onClose();
          }}
          className="modal__delete-item"
          type="button"
        >
          Delete Item
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className="modal__cancel"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
