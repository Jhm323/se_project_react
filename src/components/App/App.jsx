import "../../vendor/fonts.css";
import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const navigate = useNavigate();

  // const userName = "Terrence Tegegne";

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
  const [userName, setUserName] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Toggle F/C temperature units
  // const handleToggleSwitchChange = () => {
  //   setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  // };

  // Modal control
  const openModal = (type) => setActiveModal(type);
  const closeActiveModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    // setActiveModal("preview");
    setSelectedCard(card);
    openModal("preview");
  };

  const handleAddClick = () => openModal("add-garment");

  const handleRegister = ({ name, avatar, email, password }) => {
    signup(name, avatar, email, password)
      .then(() => {
        setRegisterOpen(false);
        setLoginOpen(true); // Optionally auto open login after register
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginOpen(false);
          // Optional: Fetch user profile or name here
          fetchUserAndData(res.token);
        }
      })
      .catch(console.error);
  };

  const fetchUserAndData = (token) => {
    checkToken(token)
      .then((data) => {
        setUserName(data.name);
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
    addItem(name, imageUrl, weather)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = (id) => {
    deleteItem(id)
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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            userName={userName}
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
                  onCardClick={handleCardClick}
                  currentTemperatureUnit={currentTemperatureUnit}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  userName={userName}
                  handleAddClick={handleAddClick}
                  isLoggedIn={isLoggedIn}
                />
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
        />

        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          onRegister={handleRegister}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
