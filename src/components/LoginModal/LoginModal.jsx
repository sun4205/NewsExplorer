import React, { useRef } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useEscapeKey from "../../hooks/useEscapeKey";
import { useForm } from "../../hooks/useForm";

function LoginModal({
  activeModal,
  closeActiveModal,
  handleLogin,
  setActiveModal,
  modalRef,
}) {
  const { values, error, handleBlur, handleChange } = useForm({
    email: "",
    password: "",
  });

  const isFilled = values.email.trim() !== "" || values.password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleLogin({
      email: values.email,
      password: values.password,
    });
    closeActiveModal();
  };

  useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  return (
    <ModalWithForm
      isOpen={activeModal === "login"}
      title="Sign in"
      secondaryButtonText={
        <>
          <span className="or-text">or</span>{" "}
          <span className="signup-text">Sign up</span>
        </>
      }
      onSecondaryClick={() => setActiveModal("register")}
      activeModal={activeModal}
      onSubmit={handleSubmit}
      modalRef={modalRef}
      closeActiveModal={closeActiveModal}
      isFilled={isFilled}
      ref={modalRef}
      className="modal modal--login"
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className={`modal__input ${
            values.email.trim() !== "" ? "filled" : ""
          }`}
          id="email"
          name="email"
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.email && <span className="error-message">{error.email}</span>}
      </label>

      <label htmlFor="password" className="modal__label modal__label_password">
        Password
        <input
          type="password"
          className={`modal__input modal__input_signin_password ${
            values.password.trim() !== "" ? "filled" : ""
          }`}
          id="password"
          name="password"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
