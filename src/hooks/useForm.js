import { useState } from "react";
import { checkEmailAvailable } from "../utils/api";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      validateEmail(value);
    }
  };

  const validateEmail = async (value) => {
    if (!value) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(value)) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "Invalid Email address",
      }));
      return;
    }

    setError((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));

    checkEmailAvailable(value)
      .then((response) => {
        console.log("Email check response:", response);
        if (!response.available) {
          console.log("Email is not available");
          setSubmitError("This email is not available");
        } else {
          setSubmitError("");
        }
      })
      .catch((err) => {
        console.error("Email check failed", err);
      });
  };

  return { values, error, handleBlur, handleChange, submitError, setValues };
}
