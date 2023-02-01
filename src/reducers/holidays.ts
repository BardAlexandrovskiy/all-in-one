import {
  SET_HOLIDAYS,
  SET_HOLIDAYS_ERROR,
  SET_HOLIDAYS_ERROR_TEXT,
  SET_HOLIDAYS_LAST_UPDATE_DATE,
  SHOW_HOLIDAYS_PRELOADER,
} from "../actions/holidays";

// Types
export type HolidayItem = { name: string; localName: string; date: string };

type State = {
  isError: boolean;
  errorText: string;
  holidaysList: HolidayItem[];
  isShowHolidaysPreloader: boolean;
  lastUpdateDate: number | null;
};

enum ACTIONS {
  SET_HOLIDAYS = "SET_HOLIDAYS",
  SET_HOLIDAYS_ERROR = "SET_HOLIDAYS_ERROR",
  SET_HOLIDAYS_ERROR_TEXT = "SET_HOLIDAYS_ERROR_TEXT",
  SHOW_HOLIDAYS_PRELOADER = "SHOW_HOLIDAYS_PRELOADER",
  SET_HOLIDAYS_LAST_UPDATE_DATE = "SET_HOLIDAYS_LAST_UPDATE_DATE",
}

type Action =
  | { type: ACTIONS.SET_HOLIDAYS; payload: { list: HolidayItem[] } }
  | { type: ACTIONS.SET_HOLIDAYS_ERROR; payload: { bool: boolean } }
  | { type: ACTIONS.SET_HOLIDAYS_ERROR_TEXT; payload: { text: string } }
  | {
      type: ACTIONS.SHOW_HOLIDAYS_PRELOADER;
      payload: { bool: boolean };
    }
  | { type: ACTIONS.SET_HOLIDAYS_LAST_UPDATE_DATE; payload: { time: string } };

// initialState
const localStorageState = localStorage.getItem("all-in-one");
let localInitialState = localStorageState
  ? JSON.parse(localStorageState)
  : null;

const defaultState: State = {
  isError: false,
  errorText: "",
  holidaysList: [],
  isShowHolidaysPreloader: false,
  lastUpdateDate: null,
};

const initialState = localInitialState?.holidays || defaultState;

// Reducer
export function holidaysReducer(state: State = initialState, action: Action) {
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
    case SET_HOLIDAYS_LAST_UPDATE_DATE:
      return { ...state, lastUpdateDate: payload.time };
    default:
      return state;
  }
}
