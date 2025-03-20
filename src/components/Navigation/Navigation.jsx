import React, { useState } from "react";
import "./Navigation.css";
import { useNavigate,useLocation } from "react-router-dom";
import Union from "../../images/Union.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Navigation({ openLoginModal, handleLogOut }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const savedNewsPage = location.pathname === "/savedNews"; 

  const handleHomeClick = () => {
    navigate("/");
  };


  const handleSavedNews = () => {
    navigate("/savedNews");
  };

  return (
    <div className="navigation__nav">
      <button onClick ={handleHomeClick} type="button" className={`navigation__home-btn${savedNewsPage ? 'font-black':""}`}>
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
            className={`navigation__savedArticle-nav ${savedNewsPage ? 'font-black':""}`}
          >
            Saved Articles
          </button>

          <div className={`navigation__username ${savedNewsPage ? 'font-black':""}`}>
            {currentUser.username}
            <button onClick={handleLogOut} type="button">
              <img src={Union} className="navigation__logout" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
