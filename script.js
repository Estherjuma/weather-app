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
 
getForecast(response.data.city);
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
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML =searchInput.value;
    searchCity(searchInput.value)
}

function formattedDay(timestamp) {
     let date = new Date(timestamp * 1000);
     let weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
     ];
     return weekDays[date.getDay()];
}


function getForecast(city) {
    let apiKey = "15b046dc320ab53a013bbof2tfa365eb";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);  
}

function displayForecast(response) {

    console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function(day, index) {
        if(index < 5){
        forecastHtml =forecastHtml +
           `<div class="row">
                <div class="col-2">
                    <div class="weather-forecast-date">${formattedDay(day.time)}</div>
                </div>
                <div class="weather-forecast-icon">
                <img src="${day.condition.icon_url}" />
                </div>
                <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}&deg</span>
               <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}&deg</span>
               </div>
            </div>`;}
});

let forecastElement = document.querySelector("#weather-forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Nairobi");


