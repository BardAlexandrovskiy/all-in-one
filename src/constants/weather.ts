// Weather backgrounds
import clearSkyImg from "../assets/images/weather/backgrounds/clear-sky.webp";
import clearSkyNightImg from "../assets/images/weather/backgrounds/clear-sky-night.webp";
import fewCloudsImg from "../assets/images/weather/backgrounds/few-clouds.webp";
import cloudsNightImg from "../assets/images/weather/backgrounds/clouds-night.webp";
import scatteredCloudsImg from "../assets/images/weather/backgrounds/scattered-clouds.webp";
import scatteredCloudsNightImg from "../assets/images/weather/backgrounds/scattered-clouds-night.webp";
import brokenCloudsImg from "../assets/images/weather/backgrounds/broken-clouds.webp";
import brokenCloudsNightImg from "../assets/images/weather/backgrounds/broken-clouds-night.webp";
import rainImg from "../assets/images/weather/backgrounds/rain.webp";
import rainNightImg from "../assets/images/weather/backgrounds/rain-night.webp";
import thunderstormImg from "../assets/images/weather/backgrounds/thunderstorm-day.webp";
import thunderstormNightImg from "../assets/images/weather/backgrounds/thunderstorm.webp";
import snowImg from "../assets/images/weather/backgrounds/snow.webp";
import snowNightImg from "../assets/images/weather/backgrounds/snow-night.webp";
import mistImg from "../assets/images/weather/backgrounds/mist.webp";
import mistNightImg from "../assets/images/weather/backgrounds/mist-night.webp";
import drizzleImg from "../assets/images/weather/backgrounds/drizzle.webp";
import drizzleNightImg from "../assets/images/weather/backgrounds/drizzle-night.webp";

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
import sunRainIcon from "../assets/images/weather/weather-condition-icons/sun-rain.svg";
import thunderstormIcon from "../assets/images/weather/weather-condition-icons/thunderstorm.svg";
import windIcon from "../assets/images/weather/weather-condition-icons/wind.svg";

import moment from "moment";
import { Forecast } from "../reducers/weather";

// Weather request function
const getWeatherForecast = async (city: string): Promise<Forecast> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`
    );

    if (response.status === 200) {
      const result = await response.json();
      const {
        list,
        city: { timezone },
      } = result;

      if (Array.isArray(list) && typeof timezone === "number") {
        const result = {
          list: list
            .filter((item) => {
              const {
                dt: time,
                dt_txt: dateText,
                main: { feels_like: feelsLike, temp },
                weather: [{ id }],
              } = item;

              if (
                typeof time === "number" &&
                typeof feelsLike === "number" &&
                typeof temp === "number" &&
                typeof id === "number" &&
                typeof dateText === "string"
              ) {
                return true;
              } else {
                return false;
              }
            })
            .map((item) => {
              const {
                dt_txt: dateText,
                main: { feels_like: feelsLike, temp },
                weather: [{ id }],
              } = item;

              const date = new Date(dateText);
              const dateUnix = date.getTime();
              let forecastTime = dateUnix + timezone * 1000;

              return {
                hours: moment(forecastTime).format("H"),
                time: moment(forecastTime).format("HH:mm"),
                date: moment(forecastTime).format("MMMM Do"),
                feelsLike: `${Math.round(feelsLike)}°C`,
                temp: `${Math.round(temp)}°C`,
                id,
              };
            }),

          errorText: "",
          isError: false,
        };

        return result;
      } else {
        throw new Error("Unable to get a forecast, try again later");
      }
    } else {
      throw new Error(`Forecast error:  ${response.status}.`);
    }
  } catch (error) {
    return {
      list: [],
      errorText:
        error instanceof Error
          ? error.message
          : "Something went wrong, try again later",
      isError: true,
    };
  }
};

export const getWeatherFunction = async (
  cityName?: string,
  lat?: number,
  long?: number,
  onlyForecast?: boolean
) => {
  let requestUrl = "";

  if (cityName) {
    requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`;
  } else if (lat && long) {
    requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`;
  }

  if (onlyForecast && cityName) {
    let forecast: Forecast = {
      list: [],
      errorText: "",
      isError: true,
    };

    if (cityName) {
      const response = await getWeatherForecast(cityName);
      forecast = response;
    }

    return { forecast };
  }

  try {
    const response = await fetch(requestUrl);
    if (response.status === 200) {
      const weatherObject = await response.json();

      const {
        weather: [{ description: weatherDescription, id }],
        main: { temp, feels_like: tempFeelsLike, humidity, pressure },
        wind: { speed: windSpeed, deg: windDeg, gust: windGust },
        clouds: { all: cloudiness },
        name: cityName,
        sys: { sunrise, sunset },
        visibility,
        timezone,
      } = weatherObject;

      const localTime = new Date().getTime();
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const currentUtcTime = localOffset + localTime;

      let forecast: Forecast = {
        list: [],
        errorText: "",
        isError: true,
      };

      if (cityName && typeof cityName === "string") {
        const response = await getWeatherForecast(cityName);
        forecast = response;
      }

      return {
        weatherInfo: {
          weatherDescription:
            typeof weatherDescription === "string"
              ? weatherDescription.charAt(0).toUpperCase() +
                weatherDescription.slice(1)
              : undefined,
          temp: typeof temp === "number" ? `${Math.round(temp)}°C` : undefined,
          tempFeelsLike:
            typeof tempFeelsLike === "number"
              ? `${Math.round(tempFeelsLike)}°C`
              : undefined,
          humidity: typeof humidity === "number" ? `${humidity}%` : undefined,
          windSpeed:
            typeof windSpeed === "number" ? `${windSpeed} m/s` : undefined,
          windDeg: typeof windDeg === "number" ? `${windDeg} deg` : undefined,
          windGust:
            typeof windGust === "number" ? `${windGust} m/s` : undefined,
          cloudiness:
            typeof cloudiness === "number" ? `${cloudiness}%` : undefined,
          pressure:
            typeof pressure === "number" ? `${pressure} hPa` : undefined,
          sunrise:
            typeof sunrise === "number" && typeof timezone === "number"
              ? getGMTTime(new Date((sunrise + timezone) * 1000))
              : undefined,
          sunset:
            typeof sunset === "number" && typeof timezone === "number"
              ? getGMTTime(new Date((sunset + timezone) * 1000))
              : undefined,
          time:
            typeof timezone === "number"
              ? +moment(currentUtcTime + 1000 * timezone).format("H")
              : undefined,
          visibility:
            typeof visibility === "number" ? `${visibility} m` : undefined,
          id: typeof id === "number" ? id : undefined,
          date:
            typeof currentUtcTime === "number"
              ? moment(currentUtcTime + 1000 * timezone).format("Do MMMM dddd")
              : undefined,
        },
        cityName: typeof cityName === "string" ? cityName : undefined,
        forecast: forecast,
      };
    } else throw new Error(`${response.status}`);
  } catch (error) {
    throw error;
  }
};

// Get time of day
export const dayOrNight = (time: number): string => {
  if (time) {
    switch (true) {
      case time < 6:
        return "night";
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
export const getWeatherBackgroundById = (id: number, time: number): string => {
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

export const getWeatherIconById = (id: number, time: number): string => {
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

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function getGMTTime(date: Date) {
  return [
    padTo2Digits(date.getUTCHours()),
    padTo2Digits(date.getUTCMinutes()),
  ].join(":");
}
