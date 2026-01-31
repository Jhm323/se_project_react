import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/constants";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Ensure clothingItems is an array
  const clothing = Array.isArray(clothingItems) ? clothingItems : [];

  // Merge defaults + backend items, backend items overwrite defaults when _id matches
  const mergedItems = [...defaultClothingItems, ...clothing];
  const itemsMap = new Map();
  mergedItems.forEach((item) => {
    const key = String(item._id);
    itemsMap.set(key, item);
  });
  const itemsToShow = Array.from(itemsMap.values());

  // Robust filter (case-insensitive)
  const targetType = (weatherData.type || "").toString().toLowerCase();
  const filteredItems = itemsToShow.filter(
    (item) => (item.weather || "").toString().toLowerCase() === targetType,
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
