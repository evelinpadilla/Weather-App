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
  console.log(response.data);
  let currentCity = document.querySelector("#currentCity");
  let currentDescription = document.querySelector("#currentDescription");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentTemp = document.querySelector("#main-temp");
  let currentWind = document.querySelector("#currentWind");
  let currentIcon = document.querySelector("#currentIcon");
  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input");
  search(city.value);
}

function search(city) {
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

let currentLocation = document.querySelector("#geo-location-button");
currentLocation.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#event-link-f");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#event-link-c");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Los Angeles");
