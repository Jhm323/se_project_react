import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";
import { useEffect } from "react";
import { Modal } from "../Modal/Modal";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isLoading = false,
  loadingText = "Saving...",
  // }) {
  //   // centralized Escape + overlay close handling, using `isOpen` and the function for closing modals
  //   useModalClose(isOpen, onClose);

  //   return (
  //     <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
  //       <div className="modal__content">
  //         <h2 className="modal__title">{title}</h2>
  //         <button
  //           onClick={onClose}
  //           className="modal__close"
  //           type="button"
  //           disabled={isLoading}
  //         />
  //         <form onSubmit={onSubmit} className="modal__form">
  //           {children}
  //           <button className="modal__submit" type="submit" disabled={isLoading}>
  //             {isLoading ? loadingText : buttonText}
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
}) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        <button type="submit" className="modal__submit" disabled={isLoading}>
          {isLoading ? loadingText : buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
