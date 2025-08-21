import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // update clothingItems array
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
        <span className="modal__error" id="item-name-error" />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
