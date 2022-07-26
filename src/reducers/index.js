import { combineReducers } from "redux";
import { jokesReducer } from "./jokes";
import { tasksReducer } from "./tasks";
import { weatherReducer } from "./weather";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  weather: weatherReducer,
  jokes: jokesReducer,
});
