import {
  JOKES_CHANGE_AMOUNT_VALUE,
  JOKES_CHANGE_BLACKLIST,
  JOKES_CHANGE_CATEGORIES,
  JOKES_CHANGE_CATEGORY_TYPE,
  JOKES_CHANGE_JOKE_TYPE,
  JOKES_CHANGE_SEARCH_VALUE,
  JOKES_RESET_FILTERS,
  SET_JOKES,
  SET_JOKES_ERROR,
  SET_JOKES_ERROR_TEXT,
  JOKES_SHOW_CATEGORIES_RED_BORDER,
  SHOW_JOKES_PRELOADER,
} from "../actions/jokes";

// Types
type Flags = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

export type JokesItem = {
  joke?: string;
  category: string;
  delivery?: string;
  flags: Flags;
  setup?: string;
  type: string;
  id: number;
};

type CategoriesListItem = { value: string; isCheck: boolean };

type BlacklistItem = { value: string; isCheck: boolean; display: string };

type JokeTypeItem = { value: string; isCheck: boolean; display: string };

type JokesState = {
  isShowJokesPreloader: boolean;
  categoryTypeValue: string;
  jokesList: JokesItem[];
  isError: boolean;
  errorText: string;
  categoriesList: CategoriesListItem[];
  isCategoriesRedBorder: boolean;
  blacklist: BlacklistItem[];
  jokeType: JokeTypeItem[];
  searchValue: string;
  amountValue: string;
};

enum ACTIONS {
  JOKES_CHANGE_CATEGORY_TYPE = "JOKES_CHANGE_CATEGORY_TYPE",
  JOKES_CHANGE_CATEGORIES = "JOKES_CHANGE_CATEGORIES",
  JOKES_CHANGE_BLACKLIST = "JOKES_CHANGE_BLACKLIST",
  JOKES_CHANGE_JOKE_TYPE = "JOKES_CHANGE_JOKE_TYPE",
  JOKES_CHANGE_SEARCH_VALUE = "JOKES_CHANGE_SEARCH_VALUE",
  JOKES_CHANGE_AMOUNT_VALUE = "JOKES_CHANGE_AMOUNT_VALUE",
  JOKES_RESET_FILTERS = "JOKES_RESET_FILTERS",
  SHOW_JOKES_PRELOADER = "SHOW_JOKES_PRELOADER",
  SET_JOKES = "SET_JOKES",
  SET_JOKES_ERROR = "SET_JOKES_ERROR",
  SET_JOKES_ERROR_TEXT = "SET_JOKES_ERROR_TEXT",
  JOKES_SHOW_CATEGORIES_RED_BORDER = "JOKES_SHOW_CATEGORIES_RED_BORDER",
}

type Action =
  | { type: ACTIONS.JOKES_CHANGE_CATEGORY_TYPE; payload: { value: string } }
  | { type: ACTIONS.JOKES_CHANGE_CATEGORIES; payload: { value: string } }
  | { type: ACTIONS.JOKES_CHANGE_BLACKLIST; payload: { value: string } }
  | { type: ACTIONS.JOKES_CHANGE_JOKE_TYPE; payload: { value: string } }
  | {
      type: ACTIONS.JOKES_CHANGE_SEARCH_VALUE;
      payload: { value: string };
    }
  | { type: ACTIONS.JOKES_CHANGE_AMOUNT_VALUE; payload: { value: string } }
  | { type: ACTIONS.JOKES_RESET_FILTERS; payload: null }
  | { type: ACTIONS.SHOW_JOKES_PRELOADER; payload: { bool: boolean } }
  | { type: ACTIONS.SET_JOKES; payload: { list: JokesItem[] } }
  | { type: ACTIONS.SET_JOKES_ERROR; payload: { bool: boolean } }
  | { type: ACTIONS.SET_JOKES_ERROR_TEXT; payload: { text: string } }
  | {
      type: ACTIONS.JOKES_SHOW_CATEGORIES_RED_BORDER;
      payload: { bool: boolean };
    };

// initialState
const localStorageState = localStorage.getItem("all-in-one");
let localInitialState = localStorageState
  ? JSON.parse(localStorageState)
  : null;

export const defaultState: JokesState = {
  isShowJokesPreloader: false,
  categoryTypeValue: "Any",
  jokesList: [],
  isError: false,
  errorText: "",
  categoriesList: [
    { value: "Programming", isCheck: false },
    { value: "Miscellaneous", isCheck: false },
    { value: "Dark", isCheck: false },
    { value: "Pun", isCheck: false },
    { value: "Spooky", isCheck: false },
    { value: "Christmas", isCheck: false },
  ],
  isCategoriesRedBorder: false,
  blacklist: [
    { value: "nsfw", isCheck: true, display: "NSFW" },
    { value: "religious", isCheck: true, display: "Religious" },
    { value: "political", isCheck: true, display: "Political" },
    { value: "racist", isCheck: true, display: "Racist" },
    { value: "sexist", isCheck: true, display: "Sexist" },
    { value: "explicit", isCheck: true, display: "Explicit" },
  ],
  jokeType: [
    { value: "single", isCheck: false, display: "One-part joke" },
    { value: "twopart", isCheck: false, display: "Two-part joke" },
    { value: "both", isCheck: true, display: "Both types" },
  ],
  searchValue: "",
  amountValue: "10",
};

const initialState = localInitialState?.jokes || defaultState;

export function jokesReducer(
  state: JokesState = initialState,
  action: Action
): JokesState {
  const { type, payload } = action;
  const { categoriesList, blacklist, jokeType } = state;

  switch (type) {
    case JOKES_CHANGE_CATEGORY_TYPE:
      return { ...state, categoryTypeValue: payload.value };
    case JOKES_CHANGE_CATEGORIES:
      return {
        ...state,
        categoriesList: categoriesList.map((category) => {
          if (category.value === payload.value) {
            return { ...category, isCheck: !category.isCheck };
          } else return category;
        }),
      };
    case JOKES_CHANGE_BLACKLIST:
      return {
        ...state,
        blacklist: blacklist.map((item) => {
          if (item.value === payload.value) {
            return { ...item, isCheck: !item.isCheck };
          } else return item;
        }),
      };
    case JOKES_CHANGE_JOKE_TYPE:
      return {
        ...state,
        jokeType: jokeType.map((item) => {
          if (item.value === payload.value) {
            return { ...item, isCheck: true };
          } else return { ...item, isCheck: false };
        }),
      };
    case JOKES_CHANGE_SEARCH_VALUE:
      return { ...state, searchValue: payload.value };
    case JOKES_CHANGE_AMOUNT_VALUE:
      return { ...state, amountValue: payload.value };
    case JOKES_RESET_FILTERS:
      return defaultState;
    case SHOW_JOKES_PRELOADER:
      return { ...state, isShowJokesPreloader: payload.bool };
    case SET_JOKES:
      return { ...state, jokesList: payload.list, errorText: "" };
    case SET_JOKES_ERROR:
      return { ...state, isError: payload.bool };
    case SET_JOKES_ERROR_TEXT:
      return { ...state, errorText: payload.text };
    case JOKES_SHOW_CATEGORIES_RED_BORDER:
      return { ...state, isCategoriesRedBorder: payload.bool };
    default:
      return state;
  }
}
