import React, { useState } from "react";
import "./Navigation.css";
import { useNavigate, useLocation } from "react-router-dom";
import logout from "../../images/logout.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Navigation({ openLoginModal, handleLogOut }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const savedNewsPage = location.pathname === "/saveNews";

  const handleHomeClick = () => {
    console.log("Navigating to Home");
    navigate("/");
  };

  const handleSavedNews = () => {
    console.log("Navigating to Saved News");
    navigate("/saveNews");
  };

  return (
    <div className="navigation__nav">
      <button
        onClick={handleHomeClick}
        type="button"
        className={`navigation__home-btn ${savedNewsPage ? "font-black" : ""}`}
      >
        Home
      </button>
      {!currentUser ? (
        <button
          type="button"
          onClick={openLoginModal}
          className="navigation__signIn-btn"
        >
          Sign In
        </button>
      ) : (
        <div className="navigation__loggedIn-control">
          <button
            onClick={handleSavedNews}
            type="button"
            className={`navigation__savedArticle-nav ${
              savedNewsPage ? "font-black" : ""
            }`}
          >
            Saved Articles
          </button>

          <div
            className={`navigation__username ${
              savedNewsPage ? "font-black" : ""
            }`}
          >
            {currentUser.username}
            <button
              onClick={handleLogOut}
              type="button"
              className={`navigation__logout ${savedNewsPage ? 'logout-black' :'logout-white'}`}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
