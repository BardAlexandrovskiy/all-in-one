import { getWeatherFunction } from "../constants/weather";

// Types
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const CHANGE_WEATHER_HEADER = "CHANGE_WEATHER_HEADER";
export const SHOW_WEATHER_SETTINGS = "SHOW_WEATHER_SETTINGS";
export const ADD_NEW_LOCATION = "ADD_NEW_LOCATION";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const SHOW_WEATHER_SETTINGS_PRELOADER =
  "SHOW_WEATHER_SETTINGS_PRELOADER";
export const UPDATE_LOCATION = "UPDATE_LOCATION";

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

      getWeatherFunction(null, lat, long)
        .then((location) => {
          const { weatherInfo, cityName } = location;

          if (cityName) {
            dispatch(
              setCurrentLocation({
                city: cityName,
                weatherInfo,
                isSearchError: false,
                id: Date.now(),
                updateWeatherTime: Date.now(),
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

export const addNewLocation = (location) => {
  return {
    type: ADD_NEW_LOCATION,
    payload: { location },
  };
};

export const deleteLocation = (id) => {
  return {
    type: DELETE_LOCATION,
    payload: { id },
  };
};

export const showWeatherSettingsPreloader = (bool) => {
  return {
    type: SHOW_WEATHER_SETTINGS_PRELOADER,
    payload: { bool },
  };
};

export const updateLocation = (id, info) => {
  return {
    type: UPDATE_LOCATION,
    payload: { id, info },
  };
};
