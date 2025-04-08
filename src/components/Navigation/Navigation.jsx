import React, { useState } from "react";
import "./Navigation.css";
import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import NewsExplorer from "../../images/NewsExplorer.svg";
import close from "../../images/close.svg";

function Navigation({ openLoginModal, handleLogOut, closeActiveModal }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const savedNewsPage = location.pathname === "/saveNews";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState); 
  };

  const handleHomeClick = () => {
    console.log("Navigating to Home");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    console.log("click")
    setIsMobileMenuOpen(false);
  };

  const handleSavedNews = () => {
    console.log("Navigating to Saved News");
    navigate("/saveNews");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="navigation">
      <button
        className={`navigation__mobile-menu ${
          currentUser && savedNewsPage ? "black" : ""
        }`}
        onClick={toggleMobileMenu}
      ></button>
      <nav className={`navigation__nav navigation__nav__mobile ${isMobileMenuOpen ? "open" : ""}`} >
        <div className="navigation__mobile-header">
         <img src={NewsExplorer} className="navigation__logo" />
         <button
          onClick={() => {
            closeMobileMenu();
          }}
          >
          <img src={close} className="navigation__nav-btn" alt="close_button" />
         </button>
        </div>
        <button
          onClick={handleHomeClick}
          type="button"
          className={`navigation__home-btn ${
            savedNewsPage ? "font-black" : ""
          } ${isMobileMenuOpen ? "show-mobile" : ""}`}
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
                className={`navigation__logout ${
                  savedNewsPage ? "logout-black" : "logout-white"
                }`}
              ></button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
