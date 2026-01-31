import clearDay from "../assets/backgrounds/clear-day.svg";
import clearNight from "../assets/backgrounds/clear-night.svg";
import cloudsDay from "../assets/backgrounds/cloudy-day.svg";
import cloudsNight from "../assets/backgrounds/cloudy-night.svg";
import coldDay from "../assets/backgrounds/cold-day.svg";
import coldNight from "../assets/backgrounds/cold-night.svg";
import defaultDay from "../assets/backgrounds/default-day.svg";
import defaultNight from "../assets/backgrounds/default-night.svg";
import mistDay from "../assets/backgrounds/mist-day.svg";
import mistNight from "../assets/backgrounds/mist-night.svg";
import rainDay from "../assets/backgrounds/rain-day.svg";
import rainNight from "../assets/backgrounds/rain-night.svg";
import snowDay from "../assets/backgrounds/snow-day.svg";
import snowNight from "../assets/backgrounds/snow-night.svg";
import stormDay from "../assets/backgrounds/storm-day.svg";
import stormNight from "../assets/backgrounds/storm-night.svg";

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "mist",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "mist",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Warm Socks",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871441/warm-socks.svg",
    likes: [],
  },

  {
    _id: 1,
    name: "Warm Hat",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871440/warm-hat.svg",
    likes: [],
  },

  {
    _id: 2,
    name: "Warm pants",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871439/warm-pants.svg",
    likes: [],
  },
  {
    _id: 3,
    name: "Warm Boots",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871439/warm-boots.svg",
    likes: [],
  },
  {
    _id: 4,
    name: "T-shirt",
    weather: "hot",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871438/T-shirt.svg",
    likes: [],
  },
  {
    _id: 5,
    name: "Tank",
    weather: "hot",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871438/tank.svg",
    likes: [],
  },
  {
    _id: 6,
    name: "Sweater",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871438/sweater.svg",
    likes: [],
  },
  {
    _id: 7,
    name: "Socks",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871437/socks.svg",
    likes: [],
  },
  {
    _id: 8,
    name: "Sunglasses",
    weather: "hot",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871437/sunglasses.svg",
    likes: [],
  },
  {
    _id: 9,
    name: "Jorts",
    weather: "hot",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871436/shorts-women.svg",
    likes: [],
  },

  {
    _id: 10,
    name: "Shorts",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871436/shorts.svg",
    likes: [],
  },
  {
    _id: 11,
    name: "Scarf",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871434/scarf.svg",
    likes: [],
  },
  {
    _id: 12,
    name: "Short-Sleeve",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871435/short-sleeve-shirt.svg",
    likes: [],
  },
  {
    _id: 13,
    name: "Sneakers",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871435/sneakers.svg",
    likes: [],
  },
  {
    _id: 14,
    name: "Pants",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871432/pants.svg",
    likes: [],
  },
  {
    _id: 15,
    name: "Long-sleeve",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871431/long-sleeve.svg",
    likes: [],
  },
  {
    _id: 16,
    name: "Flip-Flops",
    weather: "hot",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871430/flip-flops.svg",
    likes: [],
  },
  {
    _id: 17,
    name: "Bandana",
    weather: "hot",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871430/bandana.svg",
    likes: [],
  },
  {
    _id: 18,
    name: "Long-Johns",
    weather: "cold",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871429/long-johns.svg",
    likes: [],
  },
  {
    _id: 19,
    name: "Long-Sleeve-T",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871429/long-sleeve-T.svg",
    likes: [],
  },
  {
    _id: 20,
    name: "Cap",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871427/cap.svg",
    likes: [],
  },
  {
    _id: 21,
    name: "Jacket",
    weather: "warm",
    imageUrl:
      "https://res.cloudinary.com/dybcjsgfy/image/upload/v1769871427/jacket.svg",
    likes: [],
  },
];

export const coordinates = {
  latitude: 35.227085,
  longitude: -80.843124,
};

export const APIkey = "eba65e38a6d242d2541ed1f536f4917a";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://wtwr-backend-uqo4.onrender.com"
    : "http://localhost:3002";

export const bgImages = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  "clouds-day": cloudsDay,
  "clouds-night": cloudsNight,
  "cold-day": coldDay,
  "cold-night": coldNight,
  "default-day": defaultDay,
  "default-night": defaultNight,
  "mist-day": mistDay,
  "mist-night": mistNight,
  "rain-day": rainDay,
  "rain-night": rainNight,
  "snow-day": snowDay,
  "snow-night": snowNight,
  "storm-day": stormDay,
  "storm-night": stormNight,
};
