import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { signin } from "../../utils/auth";

export default function LoginModal({ onClose, isOpen, onLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //   Handle Form Submission

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any prior errors

    signin(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token); // Save token
        onLoginSuccess(data.token); // Inform App of successful login
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setErrorMessage("Invalid email or password.");
      });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span className="modal__error" id="place-name-error" />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Enter Your Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
}
