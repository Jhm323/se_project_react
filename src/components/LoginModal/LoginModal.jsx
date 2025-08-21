import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { signin } from "../../utils/auth";

export default function LoginModal({
  onClose,
  isOpen,
  onLoginSubmit,
  onSwitch,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //   Handle Form Submission

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear any prior errors
    setErrorMessage("");
    setIsLoading(true);

    signin(email, password)
      .then((data) => {
        // Save token
        localStorage.setItem("jwt", data.token);
        // Inform App of successful login
        onLoginSubmit(data.token);
        setEmail("");
        setPassword("");
        onClose();
      })
      .catch((err) => {
        console.error("Login failed:", err);

        if (err.message?.includes("NetworkError")) {
          setErrorMessage("Network issue. Please check your connection.");
        } else if (err.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage(
            err.message || "Something went wrong. Please try again later."
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isLoading} // optional: disable form when loading
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
          disabled={isLoading}
        />
        <span className="modal__error" id="email-name-error" />
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
          disabled={isLoading}
        />
      </label>
      {errorMessage && <p className="modal__error">{errorMessage}</p>}

      <button
        type="button"
        className="modal__signup-button"
        onClick={onSwitch}
        disabled={isLoading}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}
