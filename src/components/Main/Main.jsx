import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/constants"; // Import default items

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const itemsToShow =
    clothingItems.length > 0 ? clothingItems : defaultClothingItems;

  const filteredItems = itemsToShow.filter(
    (item) => item.weather === weatherData.type
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
