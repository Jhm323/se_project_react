import React from "react";
import "./SubmitButton.css";

export default function SubmitButton({
  isValid,
  isLoading = false,
  buttonText = "Submit",
  loadingText = "Saving...",
  className = "",
  ...props
}) {
  return (
    <button
      type="submit"
      className={`modal__submit ${
        isValid ? "modal__submit_active" : ""
      } ${className}`}
      disabled={isLoading || !isValid}
      {...props}
    >
      {isLoading ? loadingText : buttonText}
    </button>
  );
}
