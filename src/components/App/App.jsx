import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import * as newsapi from "../../utils/NewsApi";
import * as token from "../../utils/token";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SearchComponent from "../SearchComponent/SearchComponent";
import SavedArticles from "../SavedArticles/SavedArticles";

function App() {
  const [query, setQuery] = useState("");
  const [newsData, setNewsData] = useState({
    source: "",
    title: "",
    date: "",
    description: "",
    image: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(token.getToken());
  const [savedArticles, setSavedArticles] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const openRemoveItemModal = (card) => {
    setSelectedCard(card);
    setIsRemoveItemModalOpen(true);
  };

  const openRegisterModal = () => {
    console.log("Opening register modal");
    setActiveModal("register");
  };

  const openLoginModal = () => {
    console.log("opening login modal ");
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function asyncSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

  function getUserInformation(token) {
    return auth
      .getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          token.setToken(data.token);
          setJwt(data.token);
          setIsLoggedIn(true);
          getUserInformation(data.token).then(() => {
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
            closeActiveModal();
          });
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwtFromStorage = token.getToken();
    console.log("JWT from storage:", jwtFromStorage);

    if (!jwtFromStorage) {
      console.log("No JWT found. Logging out.");
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    getUserInformation(jwtFromStorage);
  }, [jwt]);

  const handleLogOut = () => {
    console.log("Log Out button clicked.");
    token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setJwt(null);
    navigate("/");
    console.log("User logged out successfully.");
  };

  const handleNewsSaved = ({ id, saved }) => {
    const token = localStorage.getItem("jwt");

    !saved
      ? api

          .addNewsCardSaved(id, token)
          .then((updatedData) => {
            setNewsItems((cards) =>
              cards.map((item) => (item._id === id ? updatedData : item))
            );
          })
          .catch((err) => console.log(err))
      : api

          .removeCardLike(id, token)
          .then((updatedData) => {
            setNewsItems((cards) =>
              cards.map((item) => (item._id === id ? updatedData : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSearchSubmit = (values) => {
    asyncSubmit(() =>
      newsapi.getNewsCards(values.query).then((newData) => {
        console.log("current saved news:");
        setNewsItems([newData, ...newsItems]);
      })
    );
  };

  const handleRegisterSubmit = (values) => {
    asyncSubmit(() =>
      auth.register(values.email, values.password, values.username).then(() => {
        handleLogin(values.email, values.password, () => {});
      })
    );
  };

  useEffect(() => {
    newsapi
      .getNewsCards(query)
      .then((data) => {
        console.log("API response:", data);
        if (query) {
          const filterData = filteredNewsData(data);
          console.log("Filtered data:", filterData);
          setNewsData(filterData);
        } else {
          setNewsItems(data);
        }
      })
      .catch(console.error);
  }, [query]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <div className="page-content">
          <Header
            handleSearchSubmit={handleSearchSubmit}
            query={query}
            openLoginModal={openLoginModal}
            isLoading={isLoading}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchComponent />
                  {isLoading && <Preloader />}
                  <Main newsData={newsData} newsItems={newsItems} />
                </>
              }
            />
            <Route path="/savedNews" element={<SavedArticles />} />
          </Routes>
          <Footer />
        </div>

        <LoginModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          handleLogin={handleLogin}
          setActiveModal={setActiveModal}
        />
        <RegisterModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          handleRegisterSubmit={handleRegisterSubmit}
          setActiveModal={setActiveModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
