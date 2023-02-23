import { Dispatch } from "redux";
import { getWeatherFunction } from "../constants/weather";
import { CurrentLocation, Location, WeatherInfo } from "../reducers/weather";

// Types
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const CHANGE_WEATHER_HEADER = "CHANGE_WEATHER_HEADER";
export const SHOW_WEATHER_SETTINGS = "SHOW_WEATHER_SETTINGS";
export const ADD_NEW_LOCATION = "ADD_NEW_LOCATION";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const SHOW_WEATHER_SETTINGS_PRELOADER =
  "SHOW_WEATHER_SETTINGS_PRELOADER";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const SHOW_CURRENT_LOCATION_PRELOADER =
  "SHOW_CURRENT_LOCATION_PRELOADER";
export const SET_GEO_ACCESS = "SET_GEO_ACCESS";
export const SET_ADD_LOCATION_INPUT_FOCUS = "SET_ADD_LOCATION_INPUT_FOCUS";

// Actions
export const setAddLocationInputFocus = (bool: boolean) => {
  return {
    type: SET_ADD_LOCATION_INPUT_FOCUS,
    payload: { bool },
  };
};

export const setCurrentLocation = (location?: CurrentLocation) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location,
  };
};

export const showCurrentLocationPreloader = (bool: boolean) => {
  return {
    type: SHOW_CURRENT_LOCATION_PRELOADER,
    payload: { bool },
  };
};

export const setGeoAccess = (bool: boolean) => {
  return {
    type: SET_GEO_ACCESS,
    payload: { bool },
  };
};

export const getCurrentLocationByGeo = () => {
  return (dispatch: Dispatch) => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    const success = async (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      dispatch(setGeoAccess(true));
      dispatch(showCurrentLocationPreloader(true));

      try {
        const respone = await getWeatherFunction(undefined, lat, long);
        if (respone) {
          const location = respone;
          const { cityName, weatherInfo } = location;
          if (cityName) {
            dispatch(
              setCurrentLocation({
                city: cityName,
                weatherInfo,
                id: Date.now(),
                updateWeatherTime: Date.now(),
              })
            );
          } else {
            throw new Error("City by geolocation not found");
          }
        } else throw new Error("City by geolocation not found");
      } catch (error) {
        console.log(error);
      }

      dispatch(showCurrentLocationPreloader(false));
    };

    const error = () => {
      dispatch(setGeoAccess(false));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      dispatch(setGeoAccess(false));
    }
  };
};

export const changeWeatherHeader = (bool: boolean) => {
  return {
    type: CHANGE_WEATHER_HEADER,
    payload: { bool },
  };
};

export const addNewLocation = (location: Location) => {
  return {
    type: ADD_NEW_LOCATION,
    payload: { location },
  };
};

export const deleteLocation = (id: number) => {
  return {
    type: DELETE_LOCATION,
    payload: { id },
  };
};

export const showWeatherSettingsPreloader = (bool: boolean) => {
  return {
    type: SHOW_WEATHER_SETTINGS_PRELOADER,
    payload: { bool },
  };
};

export const updateLocation = (
  id: number,
  info: { weatherInfo: WeatherInfo | undefined; updateWeatherTime: number }
) => {
  return {
    type: UPDATE_LOCATION,
    payload: { id, info },
  };
};
