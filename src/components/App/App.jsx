import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
  bgImages,
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

import defaultDay from "../../assets/backgrounds/clear-day.svg";
import defaultNight from "../../assets/backgrounds/clear-night.svg";

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

  // Dev mode state for manual weather control
  const [devMode, setDevMode] = useState(false);
  const [devCondition, setDevCondition] = useState("clear");
  const [devIsDay, setDevIsDay] = useState(true);

  // Use dev values if in dev mode, otherwise use API data
  const currentCondition = devMode ? devCondition : weatherData.condition;
  const currentIsDay = devMode ? devIsDay : weatherData.isDay;

  // Render Weather Backgrounds
  const getBgImage = () => {
    const key = `${currentCondition}-${currentIsDay ? "day" : "night"}`;
    return bgImages[key] || (currentIsDay ? defaultDay : defaultNight);
  };

  // Map condition to clothing type for dev mode
  const getTypeFromCondition = (condition) => {
    if (condition === "clear" || condition === "mist" || condition === "clouds")
      return "warm";
    if (
      condition === "rain" ||
      condition === "snow" ||
      condition === "storm" ||
      condition === "cold"
    )
      return "cold";
    return "warm"; // default
  };

  const currentType = devMode
    ? getTypeFromCondition(currentCondition)
    : weatherData.type;

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
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => {})
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => {});
  };

  // Universal submit handler
  const handleSubmit = (request, closeModal = null) => {
    setIsLoading(true);
    return request()
      .then((data) => {
        if (closeModal) closeModal();
        return data;
      })
      .catch((err) => {
        console.error("Submit error:", err);
        setIsLoading(false);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddClick = () => {
    openModal("add-garment");
  };

  const handleAddItemModalSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => addItem(item, token);
    const closeModal = () => closeActiveModal();
    return handleSubmit(makeRequest, closeModal).then(() => {
      getItems()
        .then((data) => {
          setClothingItems(data);
        })
        .catch(console.error);
    });
  };

  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => deleteItem(card._id, token);
    const closeModal = () => closeActiveModal();
    return handleSubmit(makeRequest, closeModal).then(() => {
      setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
    });
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => updateUserProfile(userData, token);
    return handleSubmit(makeRequest).then((updatedUser) => {
      setCurrentUser(updatedUser);
    });
  };

  const handleRegister = (userData) => {
    const makeRequest = () => signup(userData);
    return handleSubmit(makeRequest).then(() => {
      handleSwitchToLogin();
    });
  };

  // Event listeners
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

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
        <div
          className={`page ${currentCondition} ${currentIsDay ? "day" : "night"}`}
          style={{ backgroundImage: `url(${getBgImage()})` }}
        >
          {/* Dev Panel for Manual Weather Control */}
          {devMode && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 1000,
                background: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <button onClick={() => setDevMode(false)}>Exit Dev Mode</button>
              <div>
                <label>Day/Night: </label>
                <button onClick={() => setDevIsDay(!devIsDay)}>
                  {devIsDay ? "Day" : "Night"}
                </button>
              </div>
              <div>
                <label>Condition: </label>
                {[
                  "clear",
                  "clouds",
                  "cold",
                  "mist",
                  "rain",
                  "snow",
                  "storm",
                ].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setDevCondition(cond)}
                    style={{
                      margin: "2px",
                      background: devCondition === cond ? "yellow" : "white",
                    }}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!devMode && (
            <button
              onClick={() => setDevMode(true)}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 1000,
                background: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Dev Mode
            </button>
          )}

          <div className="page__content">
            <Header
              userName={currentUser?.name}
              handleAddClick={handleAddClick}
              weatherData={{
                ...weatherData,
                condition: currentCondition,
                isDay: currentIsDay,
              }}
              isLoggedIn={isLoggedIn}
              setLoginOpen={setLoginOpen}
              setRegisterOpen={setRegisterOpen}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={{
                      ...weatherData,
                      condition: currentCondition,
                      isDay: currentIsDay,
                      type: currentType,
                    }}
                    currentTemperatureUnit={currentTemperatureUnit}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
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
                      onUpdateUser={handleUpdateUser}
                      handleSubmit={handleSubmit}
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
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteCard={handleDeleteCard}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setRegisterOpen(false)}
            onRegister={handleRegister}
            onSwitch={handleSwitchToLogin}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setLoginOpen(false)}
            onLoginSubmit={onLogin}
            onSwitch={handleSwitchToRegister}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
