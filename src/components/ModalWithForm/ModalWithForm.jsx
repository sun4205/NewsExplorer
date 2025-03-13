import React, { useRef } from "react";
import "./ModalWithForm.css";
import signingrey from '../../images/signingrey.svg';
import signinblue from '../../images/signinblue.svg';
import close from '../../images/close.svg';
// import useEscpeKey from '../../hooks/useEscapeKey';

function ModalWithForm({
  activeModal,
  closeActiveModal,
  title,
  onSubmit,
  children,
  buttonText,  
  isOpen,
}) {
  //         const modalRef = useRef(null);
  //   useEscapeKey(!!activeModal, closeActiveModal, modalRef);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close_button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className="modal__submit"
            >
              {buttonText}
              <img src={signingrey} alt="signinbutton" className="modal__signin-grey"/>
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
