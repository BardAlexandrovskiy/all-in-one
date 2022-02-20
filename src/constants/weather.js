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
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((weatherObject) => {
      const {
        weather: [{ description: weatherDescription, id, icon }],
        main: { temp, feels_like: tempFeelsLike, humidity, pressure },
        wind: { speed: windSpeed, deg: windDeg, gust: windGust },
        clouds: { all: cloudiness },
        name: cityName,
        sys: { sunrise, sunset },
        visibility,
        dt,
      } = weatherObject;

      return {
        weatherInfo: {
          weatherDescription:
            weatherDescription !== null
              ? weatherDescription.charAt(0).toUpperCase() +
                weatherDescription.slice(1)
              : null,
          icon:
            icon !== null
              ? `http://openweathermap.org/img/wn/${icon}@2x.png`
              : null,
          temp: temp !== null ? `${Math.round(temp)}°C` : null,
          tempFeelsLike:
            tempFeelsLike !== null ? `${Math.round(tempFeelsLike)}°C` : null,
          humidity: humidity !== null ? `${humidity}%` : null,
          windSpeed: windSpeed !== null ? `${windSpeed} m/s` : null,
          windDeg: windDeg !== null ? `${windDeg} deg` : null,
          windGust: windGust !== null ? `${windGust} m/s` : null,
          cloudiness: cloudiness !== null ? `${cloudiness}%` : null,
          pressure: pressure !== null ? `${pressure} hPa` : null,
          sunrise:
            sunrise !== null ? moment(sunrise * 1000).format("HH:mm") : null,
          sunset:
            sunset !== null ? moment(sunset * 1000).format("HH:mm") : null,
          visibility: visibility !== null ? `${visibility} m` : null,
          id: id !== null ? id : null,
          updateTime:
            dt !== null
              ? `Update time: ${moment(dt * 1000).format("MM.DD, HH:mm")}`
              : null,
        },
        cityName,
      };
    });
};
