import "./RegisterModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  activeModal,
  closeActiveModal,
  handleRegisterSubmit,
  setActiveModal,
  modalRef,
}) {
  const { values, error, handleBlur, handleChange, submitError } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const isFilled =
    values.email.trim() !== "" ||
    values.password.trim() !== "" ||
    values.username.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

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
          console.log("Registration failed:", res?.message || "Unknown error");
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
          submitError={submitError}
          className="modal modal--register"
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
              value={values.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {error.email && (
              <span className="error-message">{error.email}</span>
            )}
          </label>

          <label
            htmlFor="password"
            className="modal__label modal__label_password"
          >
            Password
            <input
              type="password"
              className={`modal__input modal__input_signup_password ${
                values.password.trim() !== "" ? "filled" : ""
              }`}
              id="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="username"
            className="modal__label modal__label_username"
          >
            Username
            <input
              type="username"
              className={`modal__input modal__input_username ${
                values.username.trim() !== "" ? "filled" : ""
              }`}
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
