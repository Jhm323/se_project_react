import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import { signin } from "../../utils/auth";
import { useForm } from "../../hooks/useForm";
import useModalClose from "../../hooks/useModalClose";
import SubmitButton from "../SubmitButton/SubmitButton";

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSubmit,
  onSwitch,
  handleSubmit,
  isLoading = false,
}) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useForm({ email: "", password: "" });

  const [errorMessage, setErrorMessage] = useState("");

  // Close modal on ESC or outside click
  useModalClose(isOpen, onClose);

  // Reset form and errors when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" }, {}, false);
      setErrorMessage("");
    }
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const makeRequest = () =>
      signin(values.email, values.password).then((data) => {
        localStorage.setItem("jwt", data.token);
        onLoginSubmit(data.token);
      });

    handleSubmit(makeRequest, onClose).catch((err) => {
      if (err.message?.includes("NetworkError")) {
        setErrorMessage("Network issue. Please check your connection.");
      } else if (err.status === 401) {
        setErrorMessage("Email or password incorrect");
      } else {
        setErrorMessage(
          err.message || "Something went wrong. Please try again later."
        );
      }
    });
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
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
      </label>

      <label htmlFor="password" className="modal__label">
        Password
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
      </label>

      {/* Form-level error messages */}
      {errorMessage && <p className="modal__error">{errorMessage}</p>}

      <div className="modal__button-container">
        {/* Submit button */}
        <SubmitButton
          className="modal__submit modal__submit--login"
          isValid={isValid}
          isLoading={isLoading}
          buttonText="Log In"
          loadingText="Logging in..."
        />

        {/* Switch to Register */}
        <button
          type="button"
          className="modal__signup-button"
          onClick={onSwitch}
          disabled={isLoading}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}
