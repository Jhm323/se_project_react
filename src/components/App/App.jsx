import "../../vendor/fonts.css";
import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { signin } from "./utils/auth";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const userName = "Terrence Tegegne";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup(name, avatar, email, password)
      .then((res) => {
        console.log("User registered:", res);
        // Optionally anto-login or close modal
        setRegisterOpen(false);
      })
      .catch((err) => {
        console.error("Register error:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginOpen(false);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

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
                  // getMatchingCondition={getMatchingCondition}
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
                />
              }
            />
          </Routes>
          <Footer />
        </div>
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
