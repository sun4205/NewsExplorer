import React, { useRef, useState, useEffect } from "react";
import "./ModalWithForm.css";
import signingrey from "../../images/signingrey.svg";
import signinblue from "../../images/signinblue.svg";
import signup from "../../images/signup.svg";
import signupgrey from "../../images/signingrey.svg";
import close from "../../images/close.svg";
// import useEscpeKey from '../../hooks/useEscapeKey';

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
  //         const modalRef = useRef(null);
  //   useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  const [buttonImage, setButtonImage] = useState(signingrey);

  useEffect(() => {
    console.log("isFilled:", isFilled);
    console.log("title:", title);

    if (title === "Sign up") {
      setButtonImage(isFilled ? signup : signupgrey);
    } else {
      setButtonImage(isFilled ? signinblue : signingrey);
    }
  }, [title, isFilled]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
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
            <button type="submit" className="modal__submit">
              <img
                src={buttonImage}
                alt="button"
                className='modal__signin'
              />
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
