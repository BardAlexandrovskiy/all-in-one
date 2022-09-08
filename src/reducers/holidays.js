import {
  SET_HOLIDAYS,
  SET_HOLIDAYS_ERROR,
  SET_HOLIDAYS_ERROR_TEXT,
  SET_LAST_UPDATE_DATE,
  SHOW_HOLIDAYS_PRELOADER,
} from "../actions/holidays";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.holidays;
} else localInitialState = null;

const defaultState = {
  isError: false,
  errorText: "",
  holidaysList: [],
  isShowHolidaysPreloader: false,
  lastUpdateDate: null,
};

const initialState = localInitialState || defaultState;

export function holidaysReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_HOLIDAYS:
      return { ...state, holidaysList: payload.list };
    case SET_HOLIDAYS_ERROR:
      return { ...state, isError: payload.bool };
    case SET_HOLIDAYS_ERROR_TEXT:
      return { ...state, errorText: payload.text };
    case SHOW_HOLIDAYS_PRELOADER:
      return { ...state, isShowHolidaysPreloader: payload.bool };
    case SET_LAST_UPDATE_DATE:
      return { ...state, lastUpdateDate: payload.time };
    default:
      return state;
  }
}
