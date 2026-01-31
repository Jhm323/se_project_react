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

  // Normalize and map weather types for comparison
  const normalize = (s) => (s || "").toString().toLowerCase().trim();
  const normalizeForCompare = (s) =>
    normalize(s) === "hot" ? "warm" : normalize(s);

  const normalizedWeatherType = normalizeForCompare(weatherData.type);

  // Ensure apiItems is an array
  const apiItems = Array.isArray(clothingItems) ? clothingItems : [];

  // API items matching today's weather
  const matchingApiItems = apiItems.filter(
    (item) => normalizeForCompare(item.weather) === normalizedWeatherType,
  );

  // Display API matches when available, otherwise show defaults for this weather
  const displayItems =
    matchingApiItems.length > 0
      ? matchingApiItems
      : defaultClothingItems.filter(
          (d) => normalizeForCompare(d.weather) === normalizedWeatherType,
        );

  // Items ready to render
  const visibleItems = displayItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {visibleItems.map((item) => (
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
