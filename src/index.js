let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function displayCurrentWeather(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let currentCity = document.querySelector("#currentCity");
  let currentTemp = document.querySelector("#main-temp");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentWind = document.querySelector("#currentWind");
  currentCity.innerHTML = `${city}`;
  currentTemp.innerHTML = `${temperature}`;
  currentHumidity.innerHTML = `${humidity}`;
  currentWind.innerHTML = `${wind}`;
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input").value;
  let apiKey = "3d9eacdba9c9b4454de2da93bb9f2bb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

function geoPosition(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiKey = "3d9eacdba9c9b4454de2da93bb9f2bb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

let currentLocation = document.querySelector("#geo-location-button");
currentLocation.addEventListener("click", getLocation);
