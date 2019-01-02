import * as weather from 'fitbit-weather/app'
import document from "document"; 

let weatherTempLabel = document.getElementById("weatherTempLabel");
let weatherConditionLabel = document.getElementById("weatherConditionLabel");
let weatherLocationLabel = document.getElementById("weatherLocationLabel");
let weatherImage = document.getElementById("weatherImage");
let lastFetch = null
let lastWeather = null

export function getWeather(now, temperatureUnit) {
	updateWeather(lastWeather, temperatureUnit)
	if (lastFetch !== now.getMinutes()) {
		lastFetch = now.getMinutes()
		fetchWeather(temperatureUnit);
	}
}

function fetchWeather(temperatureUnit) {
	weather.fetch(5 * 60 * 1000) // return the cached value if it is less than 30 minutes old 
	.then(weather => {
		lastWeather = weather
		updateWeather(weather, temperatureUnit)
	})
	.catch(error => console.log(JSON.stringify(error)))
}

function updateWeather(weather, temperatureUnit) {
	if (weather) {
		weatherTempLabel.text = `${Math.round(temperatureUnit == 'f' ? weather.temperatureF : weather.temperatureC)}°`
		if (weather.description == 'Scattered Showers') {
			weatherConditionLabel.text = 'Scatt. Showers'
		} else {
			weatherConditionLabel.text = weather.description
		}
		weatherLocationLabel.text = weather.location
		weatherImage.href = getForecastIcon(weather.conditionCode, weather.isDay)
	}
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