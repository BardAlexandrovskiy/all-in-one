// Types
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const CHANGE_WEATHER_HEADER = "CHANGE_WEATHER_HEADER";

// Actions
export const setCurrentLocation = (location) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location,
  };
};

export const getCurrentLocationByGeo = () => {
  return (dispatch) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      return fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=12c7488f70bcd015f75b9a10d559d91f`
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error(response.status);
        })
        .then((location) => {
          const [{ local_names }] = location;
          if (local_names) {
            dispatch(
              setCurrentLocation({
                city: local_names.en,
                isSearchError: false,
                id: Date.now(),
              })
            );
          } else throw new Error("City by geolocation not found");
        })
        .catch(() => {
          dispatch(getCurrentLocationByIp());
        });
    };

    const error = () => {
      dispatch(getCurrentLocationByIp());
    };

    dispatch(setCurrentLocation({ isSearchError: false }));
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      dispatch(getCurrentLocationByIp());
    }
  };
};

export const getCurrentLocationByIp = () => {
  return (dispatch) => {
    return fetch(`https://api.sypexgeo.net/json/`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((location) => {
        const { city } = location;
        if (city) {
          dispatch(
            setCurrentLocation({
              city: city.name_en,
              isSearchError: false,
              id: Date.now(),
            })
          );
        } else throw new Error("City by ip not found");
      })
      .catch(() => {
        dispatch(setCurrentLocation({ isSearchError: true }));
      });
  };
};

export const changeWeatherHeader = (bool) => {
  return {
    type: CHANGE_WEATHER_HEADER,
    payload: { bool },
  };
};
