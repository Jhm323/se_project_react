import clearDay from "../assets/backgrounds/clear-day.svg";
import clearNight from "../assets/backgrounds/clear-night.svg";
import cloudsDay from "../assets/backgrounds/clouds-day.svg";
import cloudsNight from "../assets/backgrounds/clouds-night.svg";
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
    name: "Cap",
    weather: "hot",
    imageUrl:
      "https://imgs.search.brave.com/bDfNWuo39teH166WpLN1JLlGn2bGBn2EYLed0Ar06OI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oYXJk/aW5nLWxhbmUuY29t/L2Nkbi9zaG9wL2Zp/bGVzL0hhcmRpbmds/YW5lNjUzODRjM2Ux/YTIzYjc2NTM4NGMz/ZTFhM2E5LjUwMzk4/MDA0NjUzODRjM2Ux/YTNhOV82MDB4NTE1/LmpwZz92PTE3MDQz/OTMxMzQ",
    likes: [],
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    imageUrl:
      "https://imgs.search.brave.com/5m6fzO0YFMmq9vN5eTthKj3VXp1jqQ7E9whUR1qa6Us/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wLnR1/cmJvc3F1aWQuY29t/L3RzLXRodW1iL3B4/L3d6aEI2My9may8z/ZF9tYWxlX3N0YW5k/YXJkX2hvb2RpZV9i/b2R5X3NoYXBlX21v/ZGVsL2pwZy8xNjMx/NDcxNDY2LzMwMHgz/MDAvc2hhcnBfZml0/X3E4NS9kZjY5OWVl/MTE0MWM1N2JkODdi/NDU0ZTU3MjI4NWVj/OTk5NTI1N2ViLzNk/X21hbGVfc3RhbmRh/cmRfaG9vZGllX2Jv/ZHlfc2hhcGVfbW9k/ZWwuanBn",
    likes: [],
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://imgs.search.brave.com/6q8NMnSvIdeHbpPQWzkjOFhD6cHw-5e5py1VuVAYsq0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly92b2xs/ZWJhay5jb20vY2Ru/L3Nob3AvZmlsZXMv/ZWlkZXJkb3dud2lu/dGVycHVmZmVyZmxq/b3R2YWxsZXloYW5n/aW5nMDA1NS53ZWJw/P3Y9MTc0MDc0MTYy/NyZ3aWR0aD02NDA",
    likes: [],
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    imageUrl:
      "https://imgs.search.brave.com/5Hn1pZQzMQ8ttUqEZeSqnL33U4sG0QeG-EZ8oNHNO8o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcx/MjI0NDY5L3Bob3Rv/L2NhbnZhcy1zaG9l/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9b0Q1QTYxeHhn/bmEtMFdOYWZOY1p4/eVNTd0NpRW5VQ3M1/d2lESlZmYjJ0UT0",
    likes: [],
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    imageUrl:
      "https://imgs.search.brave.com/bbyOMf3y7aXGe1a3AvCuweE1BChVI1tJyZS4XHDjffo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5obS5jb20vYXNz/ZXRzL2htL2NlLzE3/L2NlMTc2YWJiNzQw/ZjAxYzE2MTVmOTk2/Y2Y4ZTAxMDlmNWRi/YjQ4MzQuanBnP2lt/d2lkdGg9MTUzNg",
    likes: [],
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://imgs.search.brave.com/ubXJnKsgn1dBGYJJylLcBIzAAsGvKj0OkW4tvInHg_g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFpQkpHcFNTVkwu/anBn",
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
