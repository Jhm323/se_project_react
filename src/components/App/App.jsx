import "../../vendor/fonts.css";
import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
} from "../../utils/api";
import * as api from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Local state
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  // Login handlers

  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const onLogOut = () => {
    handleLogout();
  };

  const onLogin = (token) => {
    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setLoginOpen(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Token validation error:", err);
        localStorage.removeItem("jwt");
      });
  };

  // Toggle F/C temperature units
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Modal control
  const openModal = (type) => setActiveModal(type);
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  // Likes
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => {
            console.log("Error adding like:", err);
          })
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => {
            console.log("Error removing like:", err);
          });
  };

  // // Universal submit handler
  const handleSubmit = (request, closeModal = null) => {
    setIsLoading(true);
    return request()
      .then(() => {
        if (closeModal) closeModal();
      })
      .catch((err) => {
        console.error(err);
        throw err; // rethrow so child components can handle it
      })
      .finally(() => setIsLoading(false));
  };

  // Add item
  const handleAddClick = () => openModal("add-garment");

  // Add item (return the promise instead of handling modal closing here)
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    return addItem({ name, imageUrl, weather }, token).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      return newItem; // return so AddItemModal's makeRequest gets a promise
    });
  };

  // Delete item
  const handleDeleteCard = (id) => {
    const token = localStorage.getItem("jwt");

    return deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch(console.error);
  };

  // const handleConfirmDelete = () => {
  //   const token = localStorage.getItem("jwt");
  //   setIsLoading(true);
  //   deleteItem(selectedCard._id, token)
  //     .then(() => {
  //       // Remove from local state
  //       setClothingItems((items) =>
  //         items.filter((item) => item._id !== selectedCard._id)
  //       );
  //       // Close modal
  //       setActiveModal("");
  //     })
  //     .catch(console.error)
  //     .finally(() => setIsLoading(false));
  // };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () =>
      deleteItem(selectedCard._id, token).then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
      });

    handleSubmit(makeRequest, closeActiveModal);
  };

  // Update user
  // const handleUpdateUser = ({ name, avatar }) => {
  //   const token = localStorage.getItem("jwt");
  //   setIsLoading(true);
  //   return updateUserProfile({ name, avatar }, token)
  //     .then((updatedUser) => {
  //       setCurrentUser(updatedUser);
  //       return updatedUser; // Return this so the child component can access it
  //     })
  //     .catch((err) => {
  //       console.log("Error updating user:", err);
  //       throw err; // Re-throw so the child component can catch it
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () =>
      updateUserProfile({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      });

    return handleSubmit(makeRequest); // handleSubmit returns undefined, so child component can rely on promise if needed
  };

  // Register → auto-login
  // const handleRegister = ({ name, avatar, email, password }) => {
  //   setIsLoading(true);
  //   signup(name, avatar, email, password)
  //     .then(() => {
  //       // close registration modal
  //       setRegisterOpen(false);
  //       // Immediately sign in the user
  //       return signin(email, password);
  //     })
  //     .then((res) => {
  //       if (res.token) {
  //         localStorage.setItem("jwt", res.token);
  //         setIsLoggedIn(true);
  //         setLoginOpen(false);
  //         // fetch user info & items
  //         fetchUserAndData(res.token);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Registration or login error:", err);
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const handleRegister = ({ name, avatar, email, password }) => {
    const makeRequest = () =>
      signup(name, avatar, email, password).then(() =>
        signin(email, password).then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            setLoginOpen(false);
            fetchUserAndData(res.token);
          }
        })
      );

    handleSubmit(makeRequest, () => setRegisterOpen(false));
  };

  // Fetch user & clothing items
  const fetchUserAndData = (token) => {
    setLoading(true);
    checkToken(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Effects

  // Escape Listener for Active Modals
  useEffect(() => {
    if (!activeModal) return; // Only add listener if a modal is active

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    // Clean up listener on unmount or when activeModal changes
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // Re-run effect when activeModal changes

  // On mount: check weather
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch(console.error);
  }, []);

  // On mount: check JWT

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserAndData(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getItems() // No token needed for getting items
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // Show loading screen if context is still fetching
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              userName={currentUser?.name}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              setLoginOpen={setLoginOpen}
              setRegisterOpen={setRegisterOpen}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    currentTemperatureUnit={currentTemperatureUnit}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      userName={currentUser?.name}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      onLogOut={onLogOut}
                      currentUser={currentUser}
                      onUpdateUser={handleUpdateUser}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          {/* Modals */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            handleSubmit={handleSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteCard={handleDeleteCard}
            handleSubmit={handleSubmit}
          />

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setRegisterOpen(false)}
            onRegister={handleRegister}
            onSwitch={handleSwitchToLogin}
            handleSubmit={handleSubmit}
          />

          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setLoginOpen(false)}
            onLoginSubmit={onLogin}
            onSwitch={handleSwitchToRegister}
            handleSubmit={handleSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
