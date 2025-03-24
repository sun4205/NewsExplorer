import "./RegisterModal.css";
import React, { useRef, useState } from "react";
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
  const [errorEmail, setErrorEmail] = useState("");

  const isFilled = values.email.trim() !== "" || values.password.trim() !== "";

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);

    if(!isValidEmail(values.email)){
      setErrorEmail("Invalid email address");
      console.log("Email error:", errorEmail);
      return;
    }else{
      setErrorEmail("");
    }

    handleRegisterSubmit({
      email: values.email,
      password: values.password,
      username: values.username,
    })
      .then((res) => {
        if (res.success) {
          setIsSuccess(true);
          setActiveModal("registerSuccess");
        } else {
          console.log("Registration failed:", res.message);
        }
      })
      .catch((err) => console.error("Registration failed:", err));
  };

  return (
    <>
      {activeModal === "registerSuccess" ? (
        <RegisterMessage
          closeActiveModal={closeActiveModal}
          setActiveModal={setActiveModal}
        />
      ) : (
        <ModalWithForm
          isOpen={activeModal === "register"}
          title="Sign Up"
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
             {errorEmail && <span className="error-text">{errorEmail}</span>}
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
