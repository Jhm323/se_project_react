import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import useModalClose from "../../hooks/useModalClose";
import SubmitButton from "../SubmitButton/SubmitButton";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitch,
  handleSubmit,
  isLoading = false,
}) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useForm({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });

  // Close modal on ESC or outside click
  useModalClose(isOpen, onClose);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm({ name: "", avatar: "", email: "", password: "" }, {}, false);
    }
  }, [isOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(() => onRegister(values), onClose);
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      {" "}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Enter Your Name"
          minLength="1"
          maxLength="30"
          required
          value={values.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>{" "}
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Enter avatar image URL"
          required
          value={values.avatar}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>{" "}
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          value={values.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>{" "}
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          value={values.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>{" "}
      <div className="modal__button-container">
        <SubmitButton
          className="modal__submit modal__submit--register"
          isValid={isValid}
          isLoading={isLoading}
          buttonText="Sign Up"
          loadingText="Registering..."
        />
        <button
          type="button"
          className="modal__login-button"
          onClick={onSwitch}
          disabled={isLoading}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
