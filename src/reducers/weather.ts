import {
  ADD_NEW_LOCATION,
  CHANGE_WEATHER_HEADER,
  DELETE_LOCATION,
  SET_ADD_LOCATION_INPUT_FOCUS,
  SET_CURRENT_LOCATION,
  SET_GEO_ACCESS,
  SET_LAST_WEATHER_SLIDE,
  SHOW_CURRENT_LOCATION_PRELOADER,
  SHOW_WEATHER_SETTINGS_PRELOADER,
  UPDATE_LOCATION,
} from "../actions/weather";

// Types
export type ForecastItem = {
  time: string;
  date: string;
  feelsLike: string;
  temp: string;
  id: number;
  hours: string;
};

export type Forecast = {
  list: ForecastItem[];
  isError: boolean;
  errorText: string;
};

export type WeatherInfo = {
  cloudiness?: string;
  date?: string;
  humidity?: string;
  id?: number;
  pressure?: string;
  sunrise?: string;
  sunset?: string;
  temp?: string;
  tempFeelsLike?: string;
  time?: number;
  visibility?: string;
  weatherDescription?: string;
  windDeg?: string;
  windGust?: string;
  windSpeed?: string;
};

export type CurrentLocation = {
  city?: string;
  weatherInfo?: WeatherInfo;
  forecast: Forecast;
  updateWeatherTime?: number;
  id?: number;
};

export type Location = {
  city: string;
  id: number;
  updateWeatherTime: number;
  weatherInfo?: WeatherInfo;
  forecast: Forecast;
};

type WeatherState = {
  currentLocation: CurrentLocation;
  isShowCurrentLocationPreloader: boolean;
  locations: Location[];
  isActiveHeader: boolean;
  isShowSettingsPreloader: boolean;
  isGeoAccess: boolean;
  addLocationInputFocus: boolean;
  lastSlide: number;
};

enum ACTIONS {
  ADD_NEW_LOCATION = "ADD_NEW_LOCATION",
  CHANGE_WEATHER_HEADER = "CHANGE_WEATHER_HEADER",
  DELETE_LOCATION = "DELETE_LOCATION",
  SET_ADD_LOCATION_INPUT_FOCUS = "SET_ADD_LOCATION_INPUT_FOCUS",
  SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION",
  SET_GEO_ACCESS = "SET_GEO_ACCESS",
  SHOW_CURRENT_LOCATION_PRELOADER = "SHOW_CURRENT_LOCATION_PRELOADER",
  SHOW_WEATHER_SETTINGS_PRELOADER = "SHOW_WEATHER_SETTINGS_PRELOADER",
  UPDATE_LOCATION = "UPDATE_LOCATION",
  SET_LAST_WEATHER_SLIDE = "SET_LAST_WEATHER_SLIDE",
}

type Action =
  | { type: ACTIONS.SET_CURRENT_LOCATION; payload: CurrentLocation }
  | { type: ACTIONS.CHANGE_WEATHER_HEADER; payload: { bool: boolean } }
  | { type: ACTIONS.ADD_NEW_LOCATION; payload: { location: Location } }
  | { type: ACTIONS.DELETE_LOCATION; payload: { id: number } }
  | {
    type: ACTIONS.SHOW_WEATHER_SETTINGS_PRELOADER;
    payload: { bool: boolean };
  }
  | {
    type: ACTIONS.UPDATE_LOCATION;
    payload: {
      id: number;
      info: {
        weatherInfo?: WeatherInfo;
        updateWeatherTime: number;
        forecast: Forecast;
      };
    };
  }
  | {
    type: ACTIONS.SHOW_CURRENT_LOCATION_PRELOADER;
    payload: { bool: boolean };
  }
  | { type: ACTIONS.SET_GEO_ACCESS; payload: { bool: boolean } }
  | {
    type: ACTIONS.SET_ADD_LOCATION_INPUT_FOCUS;
    payload: { bool: boolean };
  }
  | { type: ACTIONS.SET_LAST_WEATHER_SLIDE; payload: { number: number } };

// initialState
const localStorageState = localStorage.getItem("all-in-one");
let localInitialState = localStorageState
  ? JSON.parse(localStorageState)
  : null;

const defaultState: WeatherState = {
  currentLocation: {
    city: undefined,
    weatherInfo: undefined,
    updateWeatherTime: undefined,
    id: undefined,
    forecast: {
      list: [],
      errorText: "",
      isError: false,
    },
  },
  isShowCurrentLocationPreloader: false,
  locations: [],
  isActiveHeader: false,
  isShowSettingsPreloader: false,
  isGeoAccess: false,
  addLocationInputFocus: false,
  lastSlide: 0,
};

const initialState = localInitialState?.weather || defaultState;

export function weatherReducer(
  state: WeatherState = initialState,
  action: Action
) {
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
            city: undefined,
            weatherInfo: undefined,
            updateWeatherTime: undefined,
            id: undefined,
            forecast: {
              list: [],
              errorText: "",
              isError: false,
            },
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
      return { ...state, addLocationInputFocus: payload.bool };
    case SET_LAST_WEATHER_SLIDE:
      return { ...state, lastSlide: payload.number };
    default:
      return state;
  }
}
