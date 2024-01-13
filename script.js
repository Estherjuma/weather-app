function updateWeather(response) {
    let temperatureElement = document.querySelector("#weather-app-temp")
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humiditiyElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement =document.querySelector("#time");
    let date = new Date(response.data.time *1000);  
    let iconElement = document.querySelector("#icon")
    

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humiditiyElement.innerHTML = `${response.data.temperature.humidity}%`;
    speedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formattedDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
} 

function formattedDate(date) {
    let hour = date.getHours(); 
    let min = date.getMinutes();
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
    ];
    let day = days[date.getDay()];

    if (min < 10){
        min = `0${min}`
    }
    if (hour < 10){
        hour =`0${hour}`
    }

    return `${day} ${hour}:${min}`;
}

function searchCity(city) {
    let apiKey = "15b046dc320ab53a013bbof2tfa365eb";
    let apiUrl =
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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