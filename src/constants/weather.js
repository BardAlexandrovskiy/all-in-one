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
            typeof weatherDescription === "string"
              ? weatherDescription.charAt(0).toUpperCase() +
                weatherDescription.slice(1)
              : null,
          icon:
            typeof icon === "string"
              ? `http://openweathermap.org/img/wn/${icon}@2x.png`
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
