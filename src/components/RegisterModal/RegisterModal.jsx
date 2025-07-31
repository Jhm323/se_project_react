import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    // update register info
    onRegister({ name, avatar, email, password });
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {" "}
      <label htmlFor="name" className="modal__label">
        {" "}
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
        <span className="modal__error" id="place-name-error" />{" "}
      </label>{" "}
      <label htmlFor="avatar" className="modal__label">
        {" "}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="avatar"
          placeholder="Enter avatar image URL"
          required
          value={avatar}
          onChange={handleSetAvatar}
        />
        <span className="modal__error" id="place-avatar-error" />{" "}
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
        <span className="modal__error" id="place-email-error" />{" "}
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
        <span className="modal__error" id="place-password-error" />{" "}
      </label>{" "}
    </ModalWithForm>
  );
}

export default RegisterModal;
