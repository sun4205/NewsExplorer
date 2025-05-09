import React from "react";
import close from "../../images/close.svg";
import "./RegisterMessage.css";

function RegisterMessage({ closeActiveModal, setActiveModal }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content--register">
        <h2 className="modal__title modal__title--register">
          Registration Successfully Completed!
        </h2>
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
        <button
          onClick={() => {
            setActiveModal("login");
          }}
          type="button"
          className="signup-text modal__register_btn"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterMessage;
