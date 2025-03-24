import "./RegisterModal.css";
import React, { useRef, useState} from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  activeModal,
  closeActiveModal,
  handleRegisterSubmit,
  setActiveModal,
  modalRef,
  buttonText,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const isFilled = values.email.trim() !== "" || values.password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleRegisterSubmit({
      email: values.email,
      password: values.password,
      username: values.username,
    });
    setIsSuccess(true);
  };
  return (
    <> {isSuccess ?(
      <RegisterMessage closeActiveModal={closeActiveModal} setActiveModal={setActiveModal}/>
    ) : (
    <ModalWithForm
      isOpen={activeModal === "register"}
      title={isSuccess ? "Registration Successfully Completed" : "Sign Up"}
      secondaryButtonText={
        <>
          <span className="or-text">or</span>{" "}
          <span className="signup-text">Sign in</span>
        </>
      }
      onSecondaryClick={() => setActiveModal("login")}
      activeModal={activeModal}
      onSubmit={handleSubmit}
      modalRef={modalRef}
      closeActiveModal={closeActiveModal}
      customClass="modal__signIn"
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

      <label htmlFor="username" className="modal__label">
        Username
        <input
          type="username"
          className="modal__input"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={values.username}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
    )}
    </>
  );
}

export default RegisterModal;
