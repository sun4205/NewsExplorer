import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  
const handleBlur = (e) => {
  const { name, value } = e.target;
  if (name === "email") {
    validateEmail(value);
  }
};

  const validateEmail = (value) => {
    if (value === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "Invalid Email address",
      }));
    } else {
      const existingUser = users.find((user) => user.email === value);
      if (existingUser) {
        setError((prevErrors) => ({
          ...prevErrors,
          email: "This email is not available",
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }
  };

  return { values, error, handleBlur, handleChange, setValues };
}
