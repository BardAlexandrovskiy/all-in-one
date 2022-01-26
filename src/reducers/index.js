import { combineReducers } from "redux";
import { tasksReducer } from "./tasks";
import { weatherReducer } from "./weather";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  weather: weatherReducer,
});
