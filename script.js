function updateWeather(response) {
    let temperatureElement = document.querySelector("#weather-app-temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city")
    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city
}
;

function searchCity(city) {
    let apiKey = "15b046dc320ab53a013bbof2tfa365eb";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}


function handleSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML =searchInput.value;
    searchCity(searchInput.value)
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Nairobi");