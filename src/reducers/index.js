import { combineReducers } from "redux";
import { holidaysReducer } from "./holidays";
import { jokesReducer } from "./jokes";
import { tasksReducer } from "./tasks";
import { weatherReducer } from "./weather";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  weather: weatherReducer,
  jokes: jokesReducer,
  holidays: holidaysReducer,
});
