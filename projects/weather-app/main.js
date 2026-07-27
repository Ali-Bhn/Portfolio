const wetterDaten = document.querySelector("#weatherContainer");
const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", () => {
    starteSuche();
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        starteSuche();
    }
});

async function ladeWetter(cityName) {
    if(cityName === ""){
        renderError("Bitte gib eine Stadt ein");
        return;
    }
    searchButton.disabled = true;
    renderLoading();
    try {
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=de&format=json`;
        const responseLocation = await fetch(geocodingUrl);
        const dataLocation = await responseLocation.json();
        if (!dataLocation.results || dataLocation.results.length === 0 ){
                renderError("Stadt nicht gefunden.") ;
                return;
        }
        const location = dataLocation.results[0];
        
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
        const responseWetter = await fetch(weatherUrl);
        const dataWetter = await responseWetter.json();
        const current = dataWetter.current;
        

        renderWetter(current, location);
        
    }
    catch(error){
        console.error(error);
        renderError("Es ist ein Netzwerkfehler aufgetreten. Bitte versuche es später erneut.");
    }
    finally{
        searchButton.disabled = false;
    }
    
}

function renderWetter(current, location){
    wetterDaten.innerHTML = "";
    

    const wetterContainer = document.createElement("div");
    wetterContainer.classList.add("weather-card");
    const topRow = document.createElement("div");
    topRow.classList.add("top-row");
    wetterContainer.appendChild(topRow);

    const iconElement = document.createElement("div");
    iconElement.classList.add("weather-icon");
    const icon = getWeatherIcon(current.weather_code);
    iconElement.textContent = icon;

    const tempElemnt = document.createElement("div");
    tempElemnt.classList.add("temp-element");

    const detailsBox = document.createElement("div");
    detailsBox.classList.add("details-box");

    const cityElement = document.createElement("div");
    cityElement.classList.add("city-element");
    
    topRow.appendChild(iconElement);
    topRow.appendChild(tempElemnt);
    topRow.appendChild(detailsBox);
    topRow.appendChild(cityElement);


    const weatherDescription = document.createElement("div");
    weatherDescription.classList.add("weather-description");
    const description = getWeatherDescription(current.weather_code);
    weatherDescription.textContent = description;
    wetterContainer.appendChild(weatherDescription);

    const datum = new Date(current.time);
        const formatiertesDatum = datum.toLocaleDateString("de-DE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
            });
    renderWetterZeile(`${location.name}`, cityElement);
    renderWetterZeile(`${formatiertesDatum}`, cityElement);
    renderWetterZeile(`${Math.round(current.temperature_2m)} °C`, tempElemnt);
    renderWetterZeile(`Luftfeuchtigkeit: ${current.relative_humidity_2m} %`, detailsBox);
    renderWetterZeile(`Wind: ${current.wind_speed_10m} km/h`, detailsBox);
    wetterDaten.appendChild(wetterContainer);
}

function renderError (message){
    wetterDaten.innerHTML = "";
    const messageText = document.createElement("p");
    messageText.textContent = message;
    wetterDaten.appendChild(messageText);

}

function renderWetterZeile (text, wetterContainer){    
    const pElement = document.createElement("p");
    pElement.textContent = text;
    wetterContainer.appendChild(pElement);
    


}

function renderLoading(){
    wetterDaten.innerHTML = "";
    const loadingText = document.createElement("p");
    loadingText.textContent = "Wetter wird geladen...";
    wetterDaten.appendChild(loadingText);
}

function starteSuche (){
    const cityName = cityInput.value.trim();
    ladeWetter(cityName);

}
function getWeatherIcon (weatherCode){
    switch(weatherCode){
        case 0:
            return "☀️";
        case 1:
            return "🌤️";
        case 2:
        case 3:
            return "☁️";
        case 45:
        case 48:
            return "🌫️";
        case 51:
        case 53:
        case 55:
            return "🌦️";
        case 61:
        case 63:
        case 65:
            return "🌧️";
        case 71:
        case 73:
        case 75:
        case 77:
            return "❄️";
        case 80:
        case 81:
        case 82:
            return "🌦️";
        case 95:
        case 96:
        case 99:
            return "⛈️";
        default:
            return "❓";
    };
    console.log(typeof weatherCode)

}
 function getWeatherDescription(weatherCode){
    switch(weatherCode){
        case 0:
            return "Klarer Himmel";
        case 1:
            return "Überwiegend klar";
        case 2:
        case 3:
            return "Bewölkt";
        case 45:
        case 48:
            return "Neblig";
        case 51:
        case 53:
        case 55:
            return "Leichter Nieselregen";
        case 61:
        case 63:
        case 65:
            return "Regen";
        case 71:
        case 73:
        case 75:
        case 77:
            return "Schneefall";
        case 80:
        case 81:
        case 82:
            return "Regenschauer";
        case 95:
        case 96:
        case 99:
            return "Gewitter";
        default:
            return "Unbekannt";
    };
}