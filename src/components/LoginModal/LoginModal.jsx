import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { signin } from "../../utils/auth";
import { useForm } from "../../hooks/useForm";

export default function LoginModal({
  onClose,
  isOpen,
  onLoginSubmit,
  onSwitch,
  handleSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
      setErrorMessage("");
    }
  }, [isOpen, setValues]);

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
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage(
          err.message || "Something went wrong. Please try again later."
        );
      }
    });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
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
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
        />
      </label>

      {errorMessage && <p className="modal__error">{errorMessage}</p>}

      <button type="button" className="modal__signup-button" onClick={onSwitch}>
        or Sign Up
      </button>
    </ModalWithForm>
  );
}
