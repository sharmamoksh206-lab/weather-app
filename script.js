// search button on click function

const clickedElement = document.querySelector(".upper-right-navbar-half-1");
const searchInput = document.getElementById("search-input");
const targetedElement = document.querySelector(".Label-placeholder");

const searchButton = document.querySelector(".search-input-button");
const cityNameHtml = document.querySelector(".js-city-name");
const dateTime = document.querySelector(".js-time-day");
const weatherTemperature = document.querySelector(".js-weather-temperature");
const temperatureDescription = document.querySelector(
  ".js-weather-description"
);
const feelsLikeTemperature = document.querySelector(".js-feelslike-temperatur");

const weatherIcon = document.querySelector(".js-weather-icon");
const humidityDetails = document.querySelector(".js-detail-humidity");
const windDetails = document.querySelector(".js-detail-wind");
const pressureDetails = document.querySelector(".js-detail-pressure");
const forecastCards = document.querySelectorAll(".next-day-forecast");
const forecastContainer = document.querySelector(
  ".right-main-information-down"
);
const forecastIcon = document.querySelectorAll("js-weather-icon-forecast");
searchInput.addEventListener("focus", () => {
  targetedElement.style.display = "none";
});

//country codes
const countryNames = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria",
  BD: "Bangladesh",
  BE: "Belgium",
  BR: "Brazil",
  CA: "Canada",
  CN: "China",
  DK: "Denmark",
  EG: "Egypt",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GR: "Greece",
  HK: "Hong Kong",
  HU: "Hungary",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran",
  IQ: "Iraq",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JP: "Japan",
  KE: "Kenya",
  KW: "Kuwait",
  MY: "Malaysia",
  MX: "Mexico",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NO: "Norway",
  PK: "Pakistan",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  QA: "Qatar",
  RU: "Russia",
  SA: "Saudi Arabia",
  SG: "Singapore",
  ZA: "South Africa",
  KR: "South Korea",
  ES: "Spain",
  LK: "Sri Lanka",
  SE: "Sweden",
  CH: "Switzerland",
  TH: "Thailand",
  TR: "Turkey",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  VN: "Vietnam",
};

// sorces for weather icons

const iconSources = [
  "./assets/weather icons/storm.png", //thunderStorm icon
  "./assets/weather icons/drizzle.png", //drizzle icon
  "./assets/weather icons/rain.png", // rain icon
  "./assets/weather icons/snow.png", // snow icon
  "./assets/weather icons/wind (1).png", //atmosphere icon
  "./assets/weather icons/sun (1).png", //sum icon
  "./assets/images/ChatGPT Image Dec 31, 2025, 09_06_44 PM 1.png", // for few clouds
  "./assets/weather icons/night clouds.png", // for night few clouds
  "./assets/weather icons/night clear.png", //fpr night clear
  "./assets/weather icons/night thunderstorm.png", // for night thunderstorm
  "./assets/weather icons/night drizzle.png", // for night drizzle
  "./assets/weather icons/night rain.png", // for night rain
];

// clickedElement.addEventListener("blur", () => {
//   targetedElement.style.display = "flex";
// });

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// generating the weather data

let apikey = "0572dda9877cee0c7af4bab8e2c6143d";

function inputValue() {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let value = searchInput.value;
      console.log(value);
      updateWeatherInfo(value);
      getForecastData(value);
    }
  });
  searchButton.addEventListener("click", () => {
    let value = searchInput.value;
    console.log(value);
    getData(value);
    updateWeatherInfo(value);
    getForecastData(value);
  });
}
inputValue();

async function getData(endpoint, city) {
  let data = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`;
  let fetchData = await fetch(data);
  return fetchData.json();
}

function updateWeatherInfo(city) {
  getData("weather", city).then((e) => {
    // console.log(e);
    if (e.cod == 200) {
      const impValues = {
        temperature: `${Math.floor(e.main.temp)}°`,
        tempDescription: e.weather[0].description,
        feelsLikeTemp: Math.floor(e.main.feels_like),
        maxTemp: Math.floor(e.main.temp_max),
        mintemp: Math.floor(e.main.temp_min),
        humidity: e.main.humidity,
        wind: Math.floor(e.wind.speed),
        pressure: e.main.pressure,
      };
      // updating city name and country name
      const cityName1 = e.name;
      console.log(cityName1);

      console.log(e.sys.country);
      let countryCode = e.sys.country;
      let countryName = countryNames[countryCode];

      cityNameHtml.innerHTML = `${cityName1},${countryName}`;

      //updating temerature
      weatherTemperature.innerHTML = impValues.temperature;

      // updating temperture description
      temperatureDescription.innerHTML = impValues.tempDescription;

      // updating weather icon
      updatingWeatherID(e);
      // updating feels like temperatur

      feelsLikeTemperature.innerHTML = `Feels Like: ${impValues.feelsLikeTemp}° | High: ${impValues.maxTemp}° / Low: ${impValues.mintemp}°`;

      //updating weather details

      humidityDetails.innerHTML = `<img src="./assets/icons/Wet.png" alt="" />Humidity: ${impValues.humidity}%`;
      windDetails.innerHTML = `<img src="./assets/icons/Wind.png" alt="" />Wind: ${impValues.wind} KwH`;
      pressureDetails.innerHTML = ` <img
                      src="./assets/icons/Pressure Gauge.png"
                      alt=""
                    />Pressure: ${impValues.pressure} hPa`;

      forecastContainer.innerHTML = "";
    } else if (e.cod != 200) {
      console.log("er");
    }
  });
}

function updatingWeatherID(element) {
  let weatherId = element.weather[0].id;

  let currentTime = element.dt;
  let sunriseTime = element.sys.sunrise;
  let sunsetTime = element.sys.sunset;

  // this means if night
  let currentPhase = currentTime < sunriseTime || currentTime > sunsetTime;

  console.log(currentPhase);
  // for thunder storm
  if (weatherId >= 200 && weatherId <= 232) {
    weatherIcon.src = currentPhase ? iconSources[9] : iconSources[0];

    return;
  }

  // drizzle
  else if (weatherId >= 300 && weatherId <= 321) {
    weatherIcon.src = currentPhase ? iconSources[10] : iconSources[1];

    return;
  }

  // rain
  else if (weatherId >= 500 && weatherId <= 531) {
    weatherIcon.src = currentPhase ? iconSources[11] : iconSources[2];

    return;
  }

  // snow
  else if (weatherId >= 600 && weatherId <= 622) {
    weatherIcon.src = iconSources[3]; // same for day/night

    return;
  }

  // atmosphere
  else if (weatherId >= 701 && weatherId <= 781) {
    weatherIcon.src = iconSources[4];
    return;
  }

  // clear
  else if (weatherId == 800) {
    weatherIcon.src = currentPhase ? iconSources[8] : iconSources[5];

    return;
  }

  // clouds
  else if (weatherId >= 801 && weatherId <= 804) {
    weatherIcon.src = currentPhase ? iconSources[7] : iconSources[6];

    return;
  }
}

async function getForecastData(city) {
  let forecastData = await getData("forecast", city);

  let takenTime = "00:00:00";
  let todayDate = new Date().toISOString().split("T")[0];
  console.log(todayDate);

  forecastData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(takenTime) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      // const nextDayForecastWeather = forecastWeather;
      // //  console.log(nextDayForecastWeather);
      // console.log(nextDayForecastWeather.weather);
      updateWeatherData(forecastWeather);
    }
  });
}

function updateWeatherData(weatherData) {
  console.log(weatherData);

  const allForecastDetails = {
    temp: Math.floor(weatherData.main.temp),
    temp_min: Math.floor(weatherData.main.feels_like),
    date: weatherData.dt_txt,
  };
  console.log(allForecastDetails.temp);
  console.log(allForecastDetails.temp_min);
  console.log(allForecastDetails.date);

  const newDateForecast = new Date(allForecastDetails.date);
  const dayDate = {
    month: "short",
    day: "2-digit",
  };

  const dateResult = newDateForecast.toLocaleDateString("en-Us", dayDate);
  console.log(dateResult);

  // inserting html to forecast cards

  const forecastCards = `
<div class="next-day-forecast">
              <div class="next-day-forecast-text">
                <h2>${dateResult}</h2>
              </div>
              <div class="next-day-forecast-image">
                <img class="js-weather-icon-forecast" src="${updateForecastIcon(
                  weatherData
                )}" alt="" />
                
              </div>
              <div class="next-day-forecast-temperature">
                <h2>${allForecastDetails.temp}° / ${
    allForecastDetails.temp_min
  }°</h2>
              </div>
            </div>
`;

  forecastContainer.insertAdjacentHTML("beforeend", forecastCards);
}

function updateForecastIcon(dataOfForecast) {
  const weatherId = dataOfForecast.weather[0].id;

  if (weatherId >= 200 && weatherId <= 232) {
    return iconSources[0];
  } else if (weatherId >= 300 && weatherId <= 321) {
    return iconSources[1];
  } else if (weatherId >= 500 && weatherId <= 531) {
    return iconSources[2];
  } else if (weatherId >= 600 && weatherId <= 622) {
    return iconSources[3];
  } else if (weatherId >= 701 && weatherId <= 781) {
    return iconSources[4];
  } else if (weatherId == 800) {
    return iconSources[5];
  } else if (weatherId >= 801 && weatherId <= 804) {
    return iconSources[6];
  }
}


// code for sidebar

const sideBarArrow =document.querySelector(".menu-open");
const sideLinks = document.querySelectorAll('.nav-left-list-item a')
const sideBarContainer = document.querySelector(".left-section-nav")
const changebleArr = document.querySelector('.js-changeble-arr');
sideBarArrow.addEventListener("click",()=>{
  console.log("clicked");

if (sideBarContainer.style.width === "300px") {
  sideBarContainer.style.width = "100px";
   sideLinks.forEach(link=>{
    link.style.display = "none"
  })
   sideBarArrow.style.marginLeft = "0px";

  changebleArr.src = "./assets/icons/Double Right.png";

}else{
   sideBarContainer.style.width = "300px";

   sideLinks.forEach(link=>{
    link.style.display = "flex"
  })
  sideBarArrow.style.marginLeft = "150px";
  
  changebleArr.src = "./assets/icons/Double Left.png";
}

  
  
 

  
})
console.log(sideLinks);


// mobile navbar function

const mobileIcon = document.querySelector(".menu-icon span")
const mobileNavbar = document.querySelector('.phone-navbar-section')
const mobileNavbarExit = document.querySelector(".exit-icon img")

mobileIcon.addEventListener("click",()=>{
mobileNavbar.style.display = "block"

})
mobileNavbarExit.addEventListener("click",()=>{
mobileNavbar.style.display = "none"

})
