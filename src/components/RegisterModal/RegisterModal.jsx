import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({ isOpen, onClose, onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // update register info
    onRegister({ name, avatar, email, password }).finally(() => {
      setIsLoading(false);
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
          placeholder="Enter Your Name"
          minLength="1"
          maxLength="30"
          required
          value={name}
          onChange={handleSetName}
        />
        <span className="modal__error" id="register-name-error" />{" "}
      </label>{" "}
      <label htmlFor="avatar" className="modal__label">
        {" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Enter avatar image URL"
          required
          value={avatar}
          onChange={handleSetAvatar}
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
          value={email}
          onChange={handleSetEmail}
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
          value={password}
          onChange={handleSetPassword}
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
