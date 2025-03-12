import React, { useEffect, useState, useRef } from "react";
// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import Header from '../Header/Header'
import Main from "../Main/Main";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import * as newsapi from '../../utils/NewsApi';
import * as token from '../../utils/token';


function App() {
  const [query, setQuery] = useState("");
  const [newsData, setNewsData] = useState({
    source:"", 
    title:"", 
    date:"", 
    description:"", 
    image:"",
  });
  const [activeModal, setActiveModal] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  // const navigate = useNavigate();
  // const location = useLocation();


  
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

  // const handleLogin = ({ email, password }) => {
  //   if (!email || !password) {
  //     return;
  //   }

  //   auth
  //     .authorize(email, password)
  //     .then((data) => {
  //       if (data.token) {
  //         setToken(data.token);
  //         setIsLoggedIn(true);
  //         getUserInformation(data.token).then(() => {
  //           const redirectPath = location.state?.from?.pathname || "/";
  //           navigate(redirectPath);
  //           closeActiveModal();
  //         });
  //       }
  //     })
  //     .catch(console.error);
  // };

  useEffect(() => {
    const jwt = token.getToken();
    console.log("JWT from storage:", jwt);

    if (!jwt) {
      console.log("No JWT found. Logging out.");
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    getUserInformation(jwt);
  }, []);

  const handleLogOut = () => {
    console.log("Log Out button clicked.");
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
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
    newsapi.getNewsCards(query).then((newData)=>{
      console.log("current saved news:",);
      setNewsItems([newData,...newsItems]);
    }))
  }

  
  const handleRegisterSubmit = (values) => {
    asyncSubmit(() =>
      register(values.email, values.password, values.username).then(
        () => {
          handleLogin({ email: values.email, password: values.password, username:values.username });
        }
      )
    );
  };

  useEffect(() => {
    if(query) {
       newsapi.getNewsCards(query)
      .then((data) => {
        console.log("API response:", data);
        const filterData = filteredNewsData(data);
        console.log("Filtered data:", filterData);
        setNewsData(filterData);
    })      
      .catch(console.error);
  }
  }, [query]);

  useEffect(() => {
    newsapi.getNewsCards()
      .then((data) => {
        setNewsItems(data);
      })
      .catch(console.error);
  }, []);
  console.log(newsItems);

  return (
    <>
      <div className='page'>
        <div className='page-content'>
          <Header handleSearchSubmit={handleSearchSubmit} query={query}/>
          <Main 
          newsData = {newsData}
          newsItems = {newsItems}
          />
        </div>
      </div>
    </>
  )
}

export default App
