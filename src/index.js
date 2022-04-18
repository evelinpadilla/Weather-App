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
  let currentCity = document.querySelector("#currentCity");
  let currentDescription = document.querySelector("#currentDescription");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentTemp = document.querySelector("#main-temp");
  let currentWind = document.querySelector("#currentWind");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
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
