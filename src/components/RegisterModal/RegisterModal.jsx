import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitch,
  handleSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  // const [isLoading, setIsLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) setValues({ name: "", avatar: "", email: "", password: "" });
  }, [isOpen, setValues]);

  const onSubmit = (e) => {
    e.preventDefault();

    const makeRequest = () => onRegister(values);
    handleSubmit(makeRequest, onClose);
  };

  if (!isOpen) return null;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // update register info
  //   onRegister(values).finally(() => {
  //     setIsLoading(false);
  //     setValues({ name: "", avatar: "", email: "", password: "" });
  //   });
  // };

  // if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
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
        />
        <span className="modal__error" id="register-name-error" />{" "}
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
        />
        <span className="modal__error" id="avatar-error" />{" "}
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
        />
        <span className="modal__error" id="email-error" />{" "}
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
