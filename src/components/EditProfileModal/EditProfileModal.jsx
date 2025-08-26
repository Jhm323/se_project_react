import { useEffect, useContext, useState } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import useModalClose from "../../hooks/useModalClose";

function EditProfileModal({
  isOpen,
  onClose,
  onUpdateUser,
  handleSubmit,
  isLoading,
  buttonText = "Save changes",
  loadingText = "Saving...",
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useForm({ name: "", avatar: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Close modal on ESC or outside click
  useModalClose(isOpen, onClose);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        {
          name: currentUser.name || "",
          avatar: currentUser.avatar || "",
        },
        {},
        true
      );
    }
  }, [isOpen, currentUser, setValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!values.name || !values.avatar) {
      setErrorMessage("Please provide both a name and an avatar.");
      return;
    }

    const makeRequest = () => onUpdateUser(values);

    handleSubmit(makeRequest, onClose).catch((err) => {
      console.error(err);
      setErrorMessage("Failed to update profile. Please try again.");
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      loadingText="Saving..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          className="modal__input"
          required
          minLength="2"
          maxLength="30"
          disabled={isLoading}
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label className="modal__label">
        Avatar*
        <input
          type="url"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          className="modal__input"
          required
          disabled={isLoading}
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
      {/* {errorMessage && <p className="modal__error">{errorMessage}</p>} */}

      <button
        type="submit"
        className={`modal__submit ${isValid ? "modal__submit_active" : ""}`}
        disabled={isLoading || !isValid}
      >
        {isLoading ? loadingText : buttonText}
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
