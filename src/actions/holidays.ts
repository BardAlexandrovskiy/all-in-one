import moment from "moment";
import { HolidayItem } from "../reducers/holidays";
import { Dispatch } from "redux";

// Types
export const SET_HOLIDAYS = "SET_HOLIDAYS";
export const SHOW_HOLIDAYS_PRELOADER = "SHOW_HOLIDAYS_PRELOADER";
export const SET_HOLIDAYS_ERROR = "SET_HOLIDAYS_ERROR";
export const SET_HOLIDAYS_ERROR_TEXT = "SET_HOLIDAYS_ERROR_TEXT";
export const SET_HOLIDAYS_LAST_UPDATE_DATE = "SET_HOLIDAYS_LAST_UPDATE_DATE";

// Actions
export const setHolidays = (list: HolidayItem[]) => {
  return {
    type: SET_HOLIDAYS,
    payload: { list },
  };
};

export const showHolidaysPreloader = (bool: boolean) => {
  return {
    type: SHOW_HOLIDAYS_PRELOADER,
    payload: { bool },
  };
};

export const setError = (bool: boolean) => {
  return {
    type: SET_HOLIDAYS_ERROR,
    payload: { bool },
  };
};

export const setErrorText = (text: string) => {
  return {
    type: SET_HOLIDAYS_ERROR_TEXT,
    payload: { text },
  };
};

export const setLastUpdateDate = (time: string) => {
  return {
    type: SET_HOLIDAYS_LAST_UPDATE_DATE,
    payload: { time },
  };
};

export const getHolidays = () => {
  return async (dispatch: Dispatch) => {
    dispatch(showHolidaysPreloader(true));
    dispatch(setError(false));
    dispatch(setHolidays([]));

    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/nextPublicHolidays/UA`
      );
      if (response.status === 200) {
        const holidaysList = await response.json();
        dispatch(setLastUpdateDate(moment().format("yyyyMMDD")));
        dispatch(setHolidays(holidaysList));
      } else {
        throw new Error(`Error: ${response.status}.`);
      }
    } catch (error) {
      dispatch(setError(true));
      if (error instanceof Error) {
        dispatch(setErrorText(error.message));
      } else {
        console.log("Unexpected error", error);
      }
    }
    dispatch(showHolidaysPreloader(false));
  };
};
