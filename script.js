function updateWeather(response) {
    let temperatureElement = document.querySelector("#weather-app-temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#speed");
    let timeElement=document.querySelector("#time");
    let date = new Date(response.data.time *1000);


    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML =  formattedDate(date);
}

function formattedDate(date) {
    let hour = date.getHours();
    let min = date.getMinutes();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

      if (min<10){
       `0${min}`
      if (hour<10){
        `0${hour}`
    }
  }
    return `${day} ${hour}:${min}`
}

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