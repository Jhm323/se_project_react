import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, onSwitch }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // update register info
    onRegister(values).finally(() => {
      setIsLoading(false);
      setValues({ name: "", avatar: "", email: "", password: "" });
    });
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Registering..." : "Register"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {" "}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          minLength="1"
          maxLength="30"
          required
          value={values.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span className="modal__error" id="register-name-error" />{" "}
      </label>{" "}
      <label htmlFor="avatar" className="modal__label">
        {" "}
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
        <span className="modal__error" id="avatar-error" />{" "}
      </label>{" "}
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Enter your email"
          required
          value={values.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span className="modal__error" id="email-error" />{" "}
      </label>{" "}
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Enter your password"
          required
          value={values.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span className="modal__error" id="password-error" />{" "}
      </label>{" "}
      <button type="button" className="modal__login-button" onClick={onSwitch}>
        or Login
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
