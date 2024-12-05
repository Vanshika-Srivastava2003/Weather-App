const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

// Fetch weather data by city name or geolocation
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Update UI with weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;

    // Update weather icon based on conditions
    const weatherCondition = data.weather[0].main;
    if (weatherCondition === "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (weatherCondition === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (weatherCondition === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (weatherCondition === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (weatherCondition === "Mist") {
      weatherIcon.src = "mist.png";
    } else {
      weatherIcon.src = "default.png"; 
    }

    
    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";
  } catch (error) {
 
    weatherDiv.style.display = "none";
    errorDiv.style.display = "block";
    console.error(error.message);
  }
}

// Fetch weather based on user's current location
async function checkWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        
        try {
          const response = await fetch(locationUrl);

          if (!response.ok) {
            throw new Error("Unable to fetch location-based weather");
          }

          const data = await response.json();

          // Update UI with location-based weather
          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
          document.querySelector(".humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
          document.querySelector(".wind").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
          const weatherCondition = data.weather[0].main;
          if (weatherCondition === "Clouds") {
            weatherIcon.src = "clouds.png";
          } else if (weatherCondition === "Clear") {
            weatherIcon.src = "clear.png";
          } else if (weatherCondition === "Rain") {
            weatherIcon.src = "rain.png";
          } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "drizzle.png";
          } else if (weatherCondition === "Mist") {
            weatherIcon.src = "mist.png";
          } else {
            weatherIcon.src = "default.png"; 
          }

          weatherDiv.style.display = "block";
          errorDiv.style.display = "none";
        } catch (error) {
          console.error(error.message);
          weatherDiv.style.display = "none";
          errorDiv.style.display = "block";
        }
      },
      (error) => {
        alert("Unable to access your location. Please try manually entering a city.");
        console.error(error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Event listeners for buttons
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Automatically check weather by location when the page loads
window.addEventListener("load", () => {
  checkWeatherByLocation();
});
