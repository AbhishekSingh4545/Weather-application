const API_KEY = "b77f5091c0a2e20b493b785ac035b6af";
const weather = document.querySelector("#weather");
const form = document.querySelector("form");
const search = document.querySelector("#search");

const getWeather = async (city) => {
    weather.innerHTML = "<h2>Loading...</h2>";
    
    // Constructing the API URL with the provided API key and city (q parameter)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Check if the API returned a valid response
        if (response.ok) {
            showWeather(data); // Call function to display weather data
        } else {
            weather.innerHTML = "<h2>City not found</h2>";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weather.innerHTML = "<h2>Error fetching weather data</h2>";
    }
};

const showWeather = (data) => {
    // Display weather data using the received JSON data
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        </div>
        <div>
            <h2>${data.main.temp}°C</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
};

form.addEventListener("submit", function(event) {
    // Handle form submission: prevent default action and fetch weather data
    event.preventDefault();
    getWeather(search.value.trim()); // Trim whitespace from the input value
});