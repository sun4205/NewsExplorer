import "./Header.css";
import logo from "../../images/logo.jpg";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

function Header({ handleSearchSubmit, query, openLoginModal,handleLogOut}) {
  console.log("Header!");
  const location = useLocation();

  const savedNewsPage = location.pathname === "/savedNews"; 


  return (
    <div className={`header__container ${savedNewsPage ? 'no-background' : ''}`}>
      <header className={`header ${savedNewsPage ? 'no-background' : ''}`}>
        <img src={logo} alt={logo} className="header__logo" />
        <Navigation openLoginModal={openLoginModal} handleLogOut={handleLogOut} />
      </header>
      {location.pathname === "/" && <SearchForm handleSearchSubmit={handleSearchSubmit} query={query} />}
    </div>
  );
}

export default Header;
