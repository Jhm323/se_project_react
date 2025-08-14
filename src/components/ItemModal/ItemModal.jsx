import "./ItemModal.css";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  setActiveModal,
  card,
  onClose,
  onDeleteCard,
  onConfirmDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Step 2: Add this guard clause here to prevent rendering if card is null or undefined
  if (!card) return null;

  // Check ownership
  const isOwn = card.owner === currentUser._id;

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close modal__close-preview"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isOwn && (
            <button
              onClick={handleDeleteClick}
              className="modal__delete-item"
              type="button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>

      {activeModal === "confirm-delete" && (
        <ConfirmDeleteModal
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          onConfirmDelete={onConfirmDelete}
          onDeleteCard={onDeleteCard}
        />
      )}
    </div>
  );
}

export default ItemModal;
