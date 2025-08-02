import "../../vendor/fonts.css";
import "./App.css";

import { useEffect, useState, useContext } from "react";
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
import {
  currentUserContext,
  UserProvider,
} from "../../contexts/CurrentUserContext";

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

  const { user: currentUser, setUser: setCurrentUser } =
    useContext(currentUserContext);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle F/C temperature units

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Modal control
  const openModal = (type) => setActiveModal(type);
  const closeActiveModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");

    if (!item || !item._id) {
      console.warn("Invalid item passed to handleCardLike:", item);
      return;
    }

    const likes = Array.isArray(item.likes) ? item.likes : [];
    const isLiked = likes.includes(currentUser?._id);
    const likeAction = isLiked ? api.removeCardLike : api.addCardLike;

    likeAction(item._id, token)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((i) => (i._id === item._id ? updatedCard : i))
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  };

  const handleAddClick = () => openModal("add-garment");

  function handleUpdateUser({ name, avatar }) {
    updateUserProfile(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  }

  const handleRegister = ({ name, avatar, email, password }) => {
    signup(name, avatar, email, password)
      .then(() => {
        // close registration modal
        setRegisterOpen(false);
        // Immediately sign in the user
        return signin(email, password);
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginOpen(false);
          // fetch user info & items
          fetchUserAndData(res.token);
        }
      })
      .catch((err) => {
        console.error("Registration or login error:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginOpen(false);
          //  Fetch user profile or name here
          fetchUserAndData(res.token);
        }
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    // Remove token
    localStorage.removeItem("jwt");
    // Clear user
    setCurrentUser(null);
    // Update login state
    setIsLoggedIn(false);
    // Wherever the user is directed...
    navigate("/");
  };

  const fetchUserAndData = (token) => {
    checkToken(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed", err);
        setIsLoggedIn(false);
      });

    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");

    addItem(name, imageUrl, weather, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = (id) => {
    const token = localStorage.getItem("jwt");

    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch(console.error);
  };

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
    }
  }, []);

  // on mount: get items
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched items:", data);

        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <UserProvider>
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
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      userName={currentUser?.name}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      handleLogOut={handleLogOut}
                      handleUpdateUser={handleUpdateUser}
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
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteCard={handleDeleteCard}
            // onCardLike={handleCardLike}
          />

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setRegisterOpen(false)}
            onRegister={handleRegister}
          />
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setLoginOpen(false)}
            onLoginSubmit={handleLogin}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </UserProvider>
  );
}

export default App;
