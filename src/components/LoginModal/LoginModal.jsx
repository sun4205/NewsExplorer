import React, { useRef } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({
  activeModal,
  closeActiveModal,
  buttonText,
  handleLogin,
  setActiveModal,
  modalRef,
}) {
  const { values, handleChange } = useForm({
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
  };
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
      customClass="modal__signUp"
      isFilled={isFilled}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
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
