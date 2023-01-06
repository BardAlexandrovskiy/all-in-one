import {
  ADD_NEW_LOCATION,
  CHANGE_WEATHER_HEADER,
  DELETE_LOCATION,
  SET_ADD_LOCATION_INPUT_FOCUS,
  SET_CURRENT_LOCATION,
  SET_GEO_ACCESS,
  SHOW_CURRENT_LOCATION_PRELOADER,
  SHOW_WEATHER_SETTINGS_PRELOADER,
  UPDATE_LOCATION,
} from "../actions/weather";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.weather;
  localInitialState.addLocationInputFocus = false;
} else localInitialState = null;

const defaultState = {
  currentLocation: {
    city: "",
    weatherInfo: {},
    updateWeatherTime: null,
    id: null,
  },
  isShowCurrentLocationPreloader: false,
  locations: [],
  isActiveHeader: false,
  isShowSettings: false,
  isShowSettingsPreloader: false,
  isGeoAccess: false,
  addLocationInputFocus: false,
};

const initialState = localInitialState || defaultState;

export function weatherReducer(state = initialState, action) {
  const { type, payload } = action;
  const { currentLocation, locations } = state;

  switch (type) {
    case SET_CURRENT_LOCATION:
      if (payload) {
        return {
          ...state,
          currentLocation: Object.assign(currentLocation, payload),
          locations: locations.filter(({ city }) => city !== payload.city),
        };
      } else
        return {
          ...state,
          currentLocation: {
            city: "",
            weatherInfo: {},
            updateWeatherTime: null,
            id: null,
          },
        };
    case CHANGE_WEATHER_HEADER:
      return { ...state, isActiveHeader: payload.bool };
    case ADD_NEW_LOCATION:
      let isUnique = true;
      const {
        location: { city: newCity },
      } = payload;

      if (newCity === currentLocation.city) {
        isUnique = false;
      } else {
        locations.forEach((el) => {
          if (el.city === newCity) {
            isUnique = false;
          }
        });
      }

      if (isUnique) {
        return {
          ...state,
          locations: locations.concat(payload.location),
        };
      } else return state;
    case DELETE_LOCATION:
      return {
        ...state,
        locations: locations.filter(({ id }) => id !== payload.id),
      };
    case SHOW_WEATHER_SETTINGS_PRELOADER:
      return {
        ...state,
        isShowSettingsPreloader: payload.bool,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: locations.map((location) => {
          if (location.id === payload.id) {
            return Object.assign(location, payload.info);
          } else return location;
        }),
      };
    case SHOW_CURRENT_LOCATION_PRELOADER:
      return {
        ...state,
        isShowCurrentLocationPreloader: payload.bool,
      };
    case SET_GEO_ACCESS:
      return {
        ...state,
        isGeoAccess: payload.bool,
      };
    case SET_ADD_LOCATION_INPUT_FOCUS:
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return { ...state, addLocationInputFocus: payload.bool };
      } else {
        return state;
      }
    default:
      return state;
  }
}
