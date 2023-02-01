import moment from "moment";

// Types
export const SET_HOLIDAYS = "SET_HOLIDAYS";
export const SHOW_HOLIDAYS_PRELOADER = "SHOW_HOLIDAYS_PRELOADER";
export const SET_HOLIDAYS_ERROR = "SET_HOLIDAYS_ERROR";
export const SET_HOLIDAYS_ERROR_TEXT = "SET_HOLIDAYS_ERROR_TEXT";
export const SET_LAST_UPDATE_DATE = "SET_HOLIDAYS_LAST_UPDATE_DATE";

// Actions
export const setHolidays = (list) => {
  return {
    type: SET_HOLIDAYS,
    payload: { list },
  };
};

export const showHolidaysPreloader = (bool) => {
  return {
    type: SHOW_HOLIDAYS_PRELOADER,
    payload: { bool },
  };
};

export const setError = (bool) => {
  return {
    type: SET_HOLIDAYS_ERROR,
    payload: { bool },
  };
};

export const setErrorText = (text) => {
  return {
    type: SET_HOLIDAYS_ERROR_TEXT,
    payload: { text },
  };
};

export const setLastUpdateDate = (time) => {
  return {
    type: SET_LAST_UPDATE_DATE,
    payload: { time },
  };
};

export const getHolidays = () => {
  return async (dispatch) => {
    dispatch(showHolidaysPreloader(true));
    dispatch(setError(false));
    dispatch(setHolidays([]));

    try {
      let response = await fetch(
        `https://date.nager.at/api/v3/nextPublicHolidays/UA`
      );
      if (response.status === 200) {
        response = await response.json();
        dispatch(setLastUpdateDate(moment().format("yyyyMMDD")));
        dispatch(setHolidays(response));
      } else {
        throw new Error(`Error: ${response.status}.`);
      }
    } catch (error) {
      dispatch(setError(true));
      dispatch(setErrorText(error.message));
    }
    dispatch(showHolidaysPreloader(false));
  };
};
