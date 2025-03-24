import React, { useRef, useState, useEffect } from "react";
import "./ModalWithForm.css";
import signingrey from "../../images/signingrey.svg";
import signinblue from "../../images/signinblue.svg";
import signup from "../../images/signup.svg";
import signupgrey from "../../images/signingrey.svg";
import close from "../../images/close.svg";
import useEscapeKey from "../../hooks/useEscapeKey";

function ModalWithForm({
  activeModal,
  closeActiveModal,
  title,
  onSubmit,
  children,
  buttonText,
  isOpen,
  customClass,
  onSecondaryClick,
  secondaryButtonText,
  isFilled,
}) {
  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={modalRef}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={() => {
            console.log("closeActiveModal called");
            closeActiveModal();
          }}
          type="button"
          className="modal__close"
        >
          <img src={close} className="modal__close-btn" alt="close_button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className={`modal__submit ${
                isFilled ? "modal__submit--filled" : "modal__submit--empty"
              }`}
            >
              {title === "Sign in" ? "Sign in" : "Sign up"}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__submit modal__submit_without-border"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
