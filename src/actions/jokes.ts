import { Dispatch } from "redux";
import { JokesItem } from "../reducers/jokes";

// Types
export const JOKES_CHANGE_CATEGORY_TYPE = "JOKES_CHANGE_CATEGORY_TYPE";
export const JOKES_CHANGE_CATEGORIES = "JOKES_CHANGE_CATEGORIES";
export const JOKES_CHANGE_BLACKLIST = "JOKES_CHANGE_BLACKLIST";
export const JOKES_CHANGE_JOKE_TYPE = "JOKES_CHANGE_JOKE_TYPE";
export const JOKES_CHANGE_SEARCH_VALUE = "JOKES_CHANGE_SEARCH_VALUE";
export const JOKES_CHANGE_AMOUNT_VALUE = "JOKES_CHANGE_AMOUNT_VALUE";
export const JOKES_RESET_FILTERS = "JOKES_RESET_FILTERS";
export const SHOW_JOKES_PRELOADER = "SHOW_JOKES_PRELOADER";
export const SET_JOKES = "SET_JOKES";
export const DELETE_JOKES = "DELETE_JOKES";
export const SET_JOKES_ERROR = "SET_JOKES_ERROR";
export const SET_JOKES_ERROR_TEXT = "SET_JOKES_ERROR_TEXT";
export const JOKES_SHOW_CATEGORIES_RED_BORDER =
  "JOKES_SHOW_CATEGORIES_RED_BORDER";

// Actions
export const changeCategoryType = (value: string) => {
  return {
    type: JOKES_CHANGE_CATEGORY_TYPE,
    payload: { value },
  };
};

export const changeCategories = (value: string) => {
  return {
    type: JOKES_CHANGE_CATEGORIES,
    payload: { value },
  };
};

export const showCategoriesRedBorder = (bool: boolean) => {
  return {
    type: JOKES_SHOW_CATEGORIES_RED_BORDER,
    payload: { bool },
  };
};

export const changeBlackList = (value: string) => {
  return {
    type: JOKES_CHANGE_BLACKLIST,
    payload: { value },
  };
};

export const changeJokeType = (value: string) => {
  return {
    type: JOKES_CHANGE_JOKE_TYPE,
    payload: { value },
  };
};

export const changeSearchValue = (value: string) => {
  return {
    type: JOKES_CHANGE_SEARCH_VALUE,
    payload: { value },
  };
};

export const changeAmountValue = (value: string) => {
  return {
    type: JOKES_CHANGE_AMOUNT_VALUE,
    payload: { value },
  };
};

export const resetFilters = () => {
  return {
    type: JOKES_RESET_FILTERS,
  };
};

export const showJokesPreloader = (bool: boolean) => {
  return {
    type: SHOW_JOKES_PRELOADER,
    payload: { bool },
  };
};

export const setJokes = (list: JokesItem[]) => {
  return {
    type: SET_JOKES,
    payload: { list },
  };
};

export const setError = (bool: boolean) => {
  return {
    type: SET_JOKES_ERROR,
    payload: { bool },
  };
};

export const setErrorText = (text: string) => {
  return {
    type: SET_JOKES_ERROR_TEXT,
    payload: { text },
  };
};

export const getJokes = (request: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(showJokesPreloader(true));
    dispatch(setError(false));
    dispatch(setJokes([]));

    try {
      const response = await fetch(request);
      if (response.status === 200) {
        const jokesList = await response.json();
        const { error, jokes, joke, setup, delivery } = jokesList;
        if ((jokes || joke || setup || delivery) && !error) {
          if (Array.isArray(jokes)) {
            dispatch(setJokes(jokes));
          } else {
            delete jokesList.error;
            dispatch(setJokes([jokesList]));
          }
        } else throw new Error("Jokes not found");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      dispatch(setError(true));
      if (error instanceof Error) {
        dispatch(setErrorText(error.message));
      } else {
        console.log("Unexpected error", error);
      }
    }
    dispatch(showJokesPreloader(false));
  };
};
