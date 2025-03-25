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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SearchForm from "../SearchForm/SearchForm";
import About from '../About/About';
import RegisterMessage from "../RegisterMessage/RegisterMessage";

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
          console.log("Login successful!.");
          getUserInformation(data.token).then((userInfo) => {
            setCurrentUser(userInfo);
            console.log("User info updated:", userInfo);
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

    auth.getUserInfo(jwtFromStorage).then((userInfo) => {
      setCurrentUser(userInfo);
      console.log("userInfo", userInfo);
    });
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
            setNewsItems((cards) => {
              if (Array.isArray(cards)) {
                return cards.map((item) =>
                  item._id === id ? updatedData : item
                );
              }
              return [];
            });
          })
          .catch((err) => console.log(err))
      : api

          .removeCardLike(id, token)
          .then((updatedData) => {
            setNewsItems((cards) =>
              cards.map((item) => (item._id === id ? updatedData : item))
            );
            setNewsItems((cards) => {
              if (Array.isArray(cards)) {
                return cards.map((item) =>
                  item._id === id ? updatedData : item
                );
              }
              return [];
            });
          })
          .catch((err) => console.log(err));
  };

  const handleSearchSubmit = (values) => {
    console.log("handleSearchSubmit called with:", values);
    if (values.query.length < 3) return;

    localStorage.setItem("query", values.query);
    asyncSubmit(() =>
      newsapi.getNewsCards(values.query).then((newsData) => {
        console.log("Fetched news data:", newsData);
        setNewsItems(newsData);
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
          const filterData = newsapi.filteredNewsData(data);
          console.log("Filtered data:", filterData);
          setNewsData(filterData);
          console.log('news response', filterData);
        } else {
          setNewsItems(data);
          console.log('news response', data);
        }
      })
      .catch(console.error);
  }, [query]);

  useEffect(() => {
    if (newsItems.length > 0) {
      localStorage.setItem("newsItems", JSON.stringify(newsItems));
    }
  }, [newsItems]);

  useEffect(() => {
    const savedNewsItems = JSON.parse(localStorage.getItem("newsItems"));
    if (savedNewsItems) {
      setNewsItems(savedNewsItems);
    }
  }, []);

  useEffect(() => {
    const savedQuary = localStorage.getItem("query");
    if (savedQuary) {
      setQuery(savedQuary);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <Header
          handleSearchSubmit={handleSearchSubmit}
          query={query}
          setQuery={setQuery}
          openLoginModal={openLoginModal}         
          handleLogOut={handleLogOut}
        />

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                 
                  {query && (
                    <Main
                    newsData={newsData}
                    newsItems={newsItems}
                    handleNewsSaved={handleNewsSaved}
                    isLoading={isLoading}
                  />
                  )}
                </>
              }
            />
            <Route
              path="/savedNews"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedArticles savedArticles={savedArticles} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <About />
        <Footer />
      </div>

      {activeModal === "login" && (<LoginModal
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
        handleLogin={handleLogin}
        setActiveModal={setActiveModal}
      />)}
        {activeModal === "register" && (<RegisterModal
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
        handleRegisterSubmit={handleRegisterSubmit}
        setActiveModal={setActiveModal}
      />)}
       {activeModal === "registerSuccess" && (
        <RegisterMessage
          closeActiveModal={closeActiveModal}
          setActiveModal={setActiveModal}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
