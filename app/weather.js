import * as weather from 'fitbit-weather/app'
import document from "document"; 

let weatherTempLabel = document.getElementById("weatherTempLabel");
let weatherConditionLabel = document.getElementById("weatherConditionLabel");
let weatherLocationLabel = document.getElementById("weatherLocationLabel");
let weatherImage = document.getElementById("weatherImage");
let lastFetch = null
export let temperatureUnit = 'f';
export function setTemperatureUnit(val) { temperatureUnit = val}

export function getWeather(now) {
	if (lastFetch !== now.getMinutes()) {
		lastFetch = now.getMinutes()
		fetchWeather();
	}
}

function fetchWeather() {
	weather.fetch(30 * 60 * 1000) // return the cached value if it is less than 30 minutes old 
	.then(weather => {
		weatherTempLabel.text = `${Math.round(temperatureUnit == 'f' ? weather.temperatureF : weather.temperatureC)}°`
		weatherConditionLabel.text = weather.description
		weatherLocationLabel.text = weather.location
		weatherImage.href = getForecastIcon(weather.conditionCode, weather.isDay)
	})
	.catch(error => console.log(JSON.stringify(error)))
}

export function getForecastIcon(code, isDay){
	switch(code){
	  case 0: //ClearSky
			if (isDay)
				return "../resources/weather/whiteSun.png"
			else
				return "../resources/weather/whiteMoon.png" 
			break;
	  case 1: //FewClouds
	  case 2: //Scattered Clouds
			if (isDay)
				return "../resources/weather/whitePartlySunny.png"
			else
				return "../resources/weather/whitePartlyMoon.png"
			break;
	  case 3: //BrokenClouds
			return "../resources/weather/whiteCloud.png"
			break;
	  case 4: //ShowerRain
	  case 5: //Rain
			return "../resources/weather/whiteRain.png"
			break;
	  case 6: //Thunderstorm
			if (wordStartsWith("T", description))
				return "../resources/weather/whiteStorm.png"
			else
				return "../resources/weather/whiteRain.png"
			break;
	  case 7: //Snow
			return "../resources/weather/whiteSnow.png"
			break;
	  case 8: //Mist
			return "../resources/weather/whiteHaze.png"
			break;
	  default: //Other
			if (isDay)
				return "../resources/weather/whiteSun.png"
			else
				return "../resources/weather/whiteMoon.png"
			break;
	}
}