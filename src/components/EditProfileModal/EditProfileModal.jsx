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
    //  <ModalWithForm
    //       title="Log in"
    //       buttonText="Log in"
    //       isOpen={isOpen}
    //       onClose={onClose}
    //       onSubmit={onSubmit}
    //     >
    //       <label htmlFor="email" className="modal__label">
    //         Email{" "}
    //         <input
    //           type="email"
    //           className="modal__input"
    //           id="email"
    //           name="email"
    //           placeholder="Enter Your Email"
    //           required
    //           value={values.email}
    //           onChange={handleChange}
    //         />
    //         <span className="modal__error" id="email-name-error" />
    //       </label>
    //       <label htmlFor="password" className="modal__label">
    //         Password{" "}
    //         <input
    //           type="password"
    //           className="modal__input"
    //           id="password"
    //           name="password"
    //           placeholder="Enter Your Password"
    //           required
    //           value={values.password}
    //           onChange={handleChange}
    //         />
    //       </label>

    //       {errorMessage && <p className="modal__error">{errorMessage}</p>}

    //       <button type="button" className="modal__signup-button" onClick={onSwitch}>
    //         or Sign Up
    //       </button>
    //     </ModalWithForm>
    //   );
    // }

    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} />
        <h2 className="modal__title">Change profile data</h2>
        {error && <p className="modal__error">{error}</p>}
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal__input"
              required
            />
          </label>
          <label className="modal__label">
            Avatar*
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
