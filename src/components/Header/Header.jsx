import "./Header.css";
import logo from "../../images/logo.jpg";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

function Header({ handleSearchSubmit, query, openLoginModal}) {
  console.log("Header!");

  return (
    <div className="header__container">
      <header className="header">
        <img src={logo} alt={logo} className="header__logo" />
        <Navigation openLoginModal={openLoginModal}  />
      </header>
      <SearchForm handleSearchSubmit={handleSearchSubmit} query={query} />
    </div>
  );
}

export default Header;
