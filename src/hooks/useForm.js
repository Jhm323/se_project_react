import { useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    // get the name and value of the input because event.target is the input
    const { value, name, validationMessage } = event.target;
    // Update values
    setValues((prev) => ({ ...prev, [name]: value }));

    // Track error for this field
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    // Check the overall form validity
    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetForm = (newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  };

  return { values, handleChange, setValues, errors, isValid, resetForm };
}
