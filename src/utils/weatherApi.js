export const getWeather = async ({ latitude, longitude }, APIkey) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  );
  return checkResponse(res);
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };

  // Normalize OpenWeather "main" into our categories
  const main = (data.weather?.[0]?.main || "").toString().toLowerCase();
  let condition = "clear";
  if (main.includes("cloud")) condition = "clouds";
  else if (main.includes("rain") || main.includes("drizzle"))
    condition = "rain";
  else if (main.includes("thunder")) condition = "thunderstorm";
  else if (main.includes("snow")) condition = "snow";
  else if (
    main.includes("mist") ||
    main.includes("fog") ||
    main.includes("haze")
  )
    condition = "mist";
  else if (main.includes("clear")) condition = "clear";

  result.type = getWeatherType(result.temp.F);
  result.condition = condition;
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
