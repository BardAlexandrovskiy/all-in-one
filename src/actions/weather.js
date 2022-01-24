// Types
export const SET_LOCATION_BY_IP = "SET_LOCATION_BY_IP";

// Actions
export const setLocationByIp = (city) => {
  return {
    type: SET_LOCATION_BY_IP,
    payload: { city },
  };
};

export const getLocationByIp = () => {
  return (dispatch) => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((objectIp) => objectIp.ip)
      .then((id) => {
        fetch(`https://api.sypexgeo.net/json/${id}`)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error(response.status);
          })
          .then((location) => {
            dispatch(setLocationByIp(location.city.name_en));
          });
      });
  };
};

export const getWeatherByCity = (cityName) => {
  return (dispatch) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((weatherObject) => {
        const {
          main: { temp },
          clouds: { all },
        } = weatherObject;

        return {
          temp: Math.round(temp),
          cloudiness: all,
        };
      })
      .then((object) => console.log(object));
  };
};
