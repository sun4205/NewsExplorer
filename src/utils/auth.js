import { checkResponse } from "./api";
export const backendBaseUrl = "http://localhost:3001";

export const register = (email, password, username) => {
    return fetch(`${backendBaseUrl}/signup`, {
      method: "POST",
      headers: {        
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username}),
    }).then(checkResponse);
  };
  
  export const authorize = (email, password) => {
    return fetch(`${backendBaseUrl}/signin`, {
      method: "POST",
      headers: {       
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(checkResponse);
  };
  
  export const getUserInfo = (token) => {
    return fetch(`${backendBaseUrl}/users/me`, {
      method: "GET",
      headers: {        
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
  };
  