import { checkResponse } from "./api";
export const baseUrl = "http://localhost:3000";

export const register = (email, password, username) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        return Promise.reject(data);
      });
    }

    return res.json().then((data) => {
      return {
        ...data,
        success: true,
      };
    });
  });
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
