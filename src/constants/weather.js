// Weather backgrounds
import clearSkyImg from "../assets/images/weather/backgrounds/clear-sky.jpg";
import clearSkyNightImg from "../assets/images/weather/backgrounds/clear-sky-night.jpg";
import fewCloudsImg from "../assets/images/weather/backgrounds/few-clouds.jpg";
import cloudsNightImg from "../assets/images/weather/backgrounds/clouds-night.jpg";
import scatteredCloudsImg from "../assets/images/weather/backgrounds/scattered-clouds.jpg";
import scatteredCloudsNightImg from "../assets/images/weather/backgrounds/scattered-clouds-night.jpg";
import brokenCloudsImg from "../assets/images/weather/backgrounds/broken-clouds.jpg";
import brokenCloudsNightImg from "../assets/images/weather/backgrounds/broken-clouds-night.jpg";
import rainImg from "../assets/images/weather/backgrounds/rain.jpg";
import rainNightImg from "../assets/images/weather/backgrounds/rain-night.jpg";
import thunderstormImg from "../assets/images/weather/backgrounds/thunderstorm-day.jpg";
import thunderstormNightImg from "../assets/images/weather/backgrounds/thunderstorm.jpg";
import snowImg from "../assets/images/weather/backgrounds/snow.jpg";
import snowNightImg from "../assets/images/weather/backgrounds/snow-night.jpg";
import mistImg from "../assets/images/weather/backgrounds/mist.jpg";
import mistNightImg from "../assets/images/weather/backgrounds/mist-night.jpg";
import drizzleImg from "../assets/images/weather/backgrounds/drizzle.jpg";
import drizzleNightImg from "../assets/images/weather/backgrounds/drizzle-night.jpg";

// Weather icons
import atmosphereIcon from "../assets/images/weather/weather-condition-icons/atmosphere.svg";
import clearSkyIcon from "../assets/images/weather/weather-condition-icons/clear-sky.svg";
import clearSkyNightIcon from "../assets/images/weather/weather-condition-icons/clear-sky-night.svg";
import cloudsIcon from "../assets/images/weather/weather-condition-icons/clouds.svg";
import drizzleIcon from "../assets/images/weather/weather-condition-icons/drizzle.svg";
import fewCloudsIcon from "../assets/images/weather/weather-condition-icons/few-clouds.svg";
import fewCloudsNightIcon from "../assets/images/weather/weather-condition-icons/few-clouds-night.svg";
import freezingRainIcon from "../assets/images/weather/weather-condition-icons/freezing-rain.svg";
import nightRainIcon from "../assets/images/weather/weather-condition-icons/night-rain.svg";
import rainIcon from "../assets/images/weather/weather-condition-icons/rain.svg";
import scatteredCloudsIcon from "../assets/images/weather/weather-condition-icons/scattered-clouds.svg";
import snowIcon from "../assets/images/weather/weather-condition-icons/snow.svg";
// import snow2Icon from "../assets/images/weather/weather-condition-icons/snow-2.svg";
import sunRainIcon from "../assets/images/weather/weather-condition-icons/sun-rain.svg";
// import thunderstorm2Icon from "../assets/images/weather/weather-condition-icons/thunderstorm-2.svg";
import thunderstormIcon from "../assets/images/weather/weather-condition-icons/thunderstorm.svg";
import windIcon from "../assets/images/weather/weather-condition-icons/wind.svg";

import moment from "moment";

// Weather request function
export const getWeatherFunction = (cityName, lat, long) => {
  let request;

  if (cityName) {
    request = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`;
  } else if (lat && long) {
    request = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`;
  }
  return fetch(request)
    .then((response) => {
      if (response.status === 300) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((weatherObject) => {
      const {
        weather: [{ description: weatherDescription, id }],
        main: { temp, feels_like: tempFeelsLike, humidity, pressure },
        wind: { speed: windSpeed, deg: windDeg, gust: windGust },
        clouds: { all: cloudiness },
        name: cityName,
        sys: { sunrise, sunset },
        visibility,
        dt,
        timezone,
      } = weatherObject;

      const localTime = new Date().getTime();
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const currentUtcTime = localOffset + localTime;

      return {
        weatherInfo: {
          weatherDescription:
            typeof weatherDescription === "string"
              ? weatherDescription.charAt(0).toUpperCase() +
                weatherDescription.slice(1)
              : null,
          temp: typeof temp === "number" ? `${Math.round(temp)}°C` : null,
          tempFeelsLike:
            typeof tempFeelsLike === "number"
              ? `${Math.round(tempFeelsLike)}°C`
              : null,
          humidity: typeof humidity === "number" ? `${humidity}%` : null,
          windSpeed: typeof windSpeed === "number" ? `${windSpeed} m/s` : null,
          windDeg: typeof windDeg === "number" ? `${windDeg} deg` : null,
          windGust: typeof windGust === "number" ? `${windGust} m/s` : null,
          cloudiness: typeof cloudiness === "number" ? `${cloudiness}%` : null,
          pressure: typeof pressure === "number" ? `${pressure} hPa` : null,
          sunrise:
            typeof sunrise === "number"
              ? moment(sunrise * 1000).format("HH:mm")
              : null,
          sunset:
            typeof sunset === "number"
              ? moment(sunset * 1000).format("HH:mm")
              : null,
          time:
            typeof timezone === "number"
              ? moment(currentUtcTime + 1000 * timezone).format("H")
              : null,
          visibility: typeof visibility === "number" ? `${visibility} m` : null,
          id: typeof id === "number" ? id : null,
          date:
            typeof dt === "number"
              ? moment(dt * 1000).format("Do MMMM dddd")
              : null,
        },
        cityName: typeof cityName === "string" ? cityName : null,
      };
    });
};

// Get time of day
export const dayOrNight = (time) => {
  if (time) {
    switch (true) {
      case time < 6:
        return "night";
      case time < 12:
      case time < 18:
        return "day";
      default:
        return "night";
    }
  } else {
    return "day";
  }
};

// Get weather background by id
export const getWeatherBackgroundById = (id, time) => {
  let backgroundImageSrc = null;
  let timesOfDay = dayOrNight(time);

  switch (true) {
    case id >= 200 && id <= 232:
      if (timesOfDay === "night") {
        backgroundImageSrc = thunderstormNightImg;
      } else {
        backgroundImageSrc = thunderstormImg;
      }
      break;
    case id >= 300 && id <= 321:
      if (timesOfDay === "night") {
        backgroundImageSrc = drizzleNightImg;
      } else {
        backgroundImageSrc = drizzleImg;
      }
      break;
    case id >= 500 && id <= 531:
      if (timesOfDay === "night") {
        backgroundImageSrc = rainNightImg;
      } else {
        backgroundImageSrc = rainImg;
      }
      break;
    case id >= 600 && id <= 622:
      if (timesOfDay === "night") {
        backgroundImageSrc = snowNightImg;
      } else {
        backgroundImageSrc = snowImg;
      }
      break;
    case id >= 700 && id <= 781:
      if (timesOfDay === "night") {
        backgroundImageSrc = mistNightImg;
      } else {
        backgroundImageSrc = mistImg;
      }
      break;
    case id === 800:
      if (timesOfDay === "night") {
        backgroundImageSrc = clearSkyNightImg;
      } else {
        backgroundImageSrc = clearSkyImg;
      }
      break;
    case id === 801:
      if (timesOfDay === "night") {
        backgroundImageSrc = cloudsNightImg;
      } else {
        backgroundImageSrc = fewCloudsImg;
      }
      break;
    case id === 802:
      if (timesOfDay === "night") {
        backgroundImageSrc = scatteredCloudsNightImg;
      } else {
        backgroundImageSrc = scatteredCloudsImg;
      }
      break;
    default:
      if (timesOfDay === "night") {
        backgroundImageSrc = brokenCloudsNightImg;
      } else {
        backgroundImageSrc = brokenCloudsImg;
      }
      break;
  }

  return backgroundImageSrc;
};

export const getWeatherIconById = (id, time) => {
  let timesOfDay = dayOrNight(time);
  let icon = null;

  switch (true) {
    case id >= 200 && id <= 232:
      icon = thunderstormIcon;
      break;
    case id >= 300 && id <= 321:
      icon = drizzleIcon;
      break;
    case id >= 500 && id <= 504:
      if (timesOfDay === "night") {
        icon = nightRainIcon;
      } else {
        icon = sunRainIcon;
      }
      break;
    case id >= 520 && id <= 531:
      icon = rainIcon;
      break;
    case id === 511:
      icon = freezingRainIcon;
      break;
    case id >= 600 && id <= 622:
      icon = snowIcon;
      break;
    case id === 731 || id === 771 || id === 781:
      icon = windIcon;
      break;
    case id >= 701 && id <= 721:
    case id >= 741 && id <= 762:
      icon = atmosphereIcon;
      break;
    case id === 800:
      if (timesOfDay === "night") {
        icon = clearSkyNightIcon;
      } else {
        icon = clearSkyIcon;
      }
      break;
    case id === 801:
      if (timesOfDay === "night") {
        icon = fewCloudsNightIcon;
      } else {
        icon = fewCloudsIcon;
      }
      break;
    case id === 802:
      icon = scatteredCloudsIcon;
      break;
    default:
      icon = cloudsIcon;
      break;
  }

  return icon;
};
