import {
  ADD_NEW_LOCATION,
  CHANGE_WEATHER_HEADER,
  DELETE_LOCATION,
  SET_CURRENT_LOCATION,
  SHOW_CURRENT_LOCATION_PRELOADER,
  SHOW_WEATHER_SETTINGS_PRELOADER,
  UPDATE_LOCATION,
} from "../actions/weather";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.weather;
} else localInitialState = null;

const initialState = localInitialState || {
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
};

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
    default:
      return state;
  }
}
