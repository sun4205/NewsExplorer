import './Navigation.css';
import Union from "../../images/Union.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Navigation(openLoginModal) {
    const { currentUser } = useContext(CurrentUserContext);
    return(
        <div className="navigation__nav">
        <button type="button" className="navigation__home-btn">
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
            <a href="/savedArticle">
              <button type="button" className="navigation__savedArticle-nav">
                Saved Articles
              </button>
            </a>
           
              <div className="navigation__username">{currentUser.username}
                <button type="button">
                  <img src ={Union} className="navigation__logout"/>
                </button>
              </div>
            
          </div>
        )}
      </div>
    )
}

export default Navigation;