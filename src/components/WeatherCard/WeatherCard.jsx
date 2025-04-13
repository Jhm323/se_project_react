import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOption[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOptionUrl.url}
        alt="clear"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
