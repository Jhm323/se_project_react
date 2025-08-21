import { useState, useContext, useEffect } from "react";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !avatar) {
      setError("Please provide both a name and an avatar.");
      return;
    }
    onUpdateUser({ name, avatar })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update profile. Please try again.");
      });
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} />
        <h2 className="modal__title">Edit Profile</h2>
        {error && <p className="modal__error">{error}</p>}
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal__input"
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL:
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="modal__input"
              required
            />
          </label>
          <button
            type="submit"
            className="modal__save-button"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
