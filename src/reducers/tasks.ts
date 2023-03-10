import {
  ADD_NEW_TASK,
  CHANGE_TASK_FILTER,
  DELETE_TASK,
  CHANGE_SEARCH_TASKS_INPUT_VALUE,
  TOGGLE_TASK,
  CHANGE_ADD_TASK_INPUT_VALUE,
  CHECK_ALL_TASKS,
  DELETE_COMPLETED_TASKS,
  EDIT_TASK,
  SET_ADD_TASK_INPUT_FOCUS,
} from "../actions/tasks";
import { filterAll } from "../constants/tasks";

// Types
type tasksItem = {
  value: string;
  check: boolean;
  id: number;
};

type TasksState = {
  list: tasksItem[];
  filter: string;
  searchTasksInputValue: string;
  addTaskInputValue: string;
  addTaskInputFocus: boolean;
};

enum ACTIONS {
  ADD_NEW_TASK = "ADD_NEW_TASK",
  CHANGE_TASK_FILTER = "CHANGE_TASK_FILTER",
  DELETE_TASK = "DELETE_TASK",
  CHANGE_SEARCH_TASKS_INPUT_VALUE = "CHANGE_SEARCH_TASKS_INPUT_VALUE",
  TOGGLE_TASK = "TOGGLE_TASK",
  CHANGE_ADD_TASK_INPUT_VALUE = "CHANGE_ADD_TASK_INPUT_VALUE",
  CHECK_ALL_TASKS = "CHECK_ALL_TASKS",
  DELETE_COMPLETED_TASKS = "DELETE_COMPLETED_TASKS",
  EDIT_TASK = "EDIT_TASK",
  SET_ADD_TASK_INPUT_FOCUS = "SET_ADD_TASK_INPUT_FOCUS",
}

type Action =
  | { type: ACTIONS.ADD_NEW_TASK; payload: { value: string } }
  | { type: ACTIONS.TOGGLE_TASK; payload: { id: number } }
  | { type: ACTIONS.DELETE_TASK; payload: { id: number } }
  | { type: ACTIONS.CHANGE_TASK_FILTER; payload: { filter: string } }
  | {
      type: ACTIONS.CHANGE_SEARCH_TASKS_INPUT_VALUE;
      payload: { value: string };
    }
  | { type: ACTIONS.CHANGE_ADD_TASK_INPUT_VALUE; payload: { value: string } }
  | { type: ACTIONS.CHECK_ALL_TASKS; payload: null }
  | { type: ACTIONS.DELETE_COMPLETED_TASKS; payload: null }
  | { type: ACTIONS.EDIT_TASK; payload: { id: number; value: string } }
  | { type: ACTIONS.SET_ADD_TASK_INPUT_FOCUS; payload: { bool: boolean } };

// initialState
const localStorageState = localStorage.getItem("all-in-one");
let localInitialState = localStorageState
  ? JSON.parse(localStorageState)
  : null;

const defaultState: TasksState = {
  list: [],
  filter: filterAll.name,
  searchTasksInputValue: "",
  addTaskInputValue: "",
  addTaskInputFocus: false,
};

const initialState = localInitialState?.tasks || defaultState;

export function tasksReducer(state: TasksState = initialState, action: Action) {
  const { type, payload } = action;
  const { list } = state;

  switch (type) {
    case ADD_NEW_TASK:
      return {
        ...state,
        list: list.concat({
          value: payload.value,
          check: false,
          id: Date.now(),
        }),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        list: list.map((item) => {
          if (item.id === payload.id) {
            return { ...item, check: !item.check };
          } else return item;
        }),
      };
    case DELETE_TASK:
      return { ...state, list: list.filter(({ id }) => id !== payload.id) };
    case CHANGE_TASK_FILTER:
      return { ...state, filter: payload.filter };
    case CHANGE_SEARCH_TASKS_INPUT_VALUE:
      return { ...state, searchTasksInputValue: payload.value };
    case CHANGE_ADD_TASK_INPUT_VALUE:
      return { ...state, addTaskInputValue: payload.value };
    case CHECK_ALL_TASKS:
      let check = false;
      list.forEach((el) => {
        if (!el.check) {
          check = true;
        }
      });
      return {
        ...state,
        list: list.map((el) => {
          return { ...el, check: check };
        }),
      };
    case DELETE_COMPLETED_TASKS:
      return {
        ...state,
        list: list.filter(({ check }) => !check),
      };
    case EDIT_TASK:
      return {
        ...state,
        list: list.map((task) => {
          const { id, value } = payload;
          if (task.id === id) {
            task.value = value;
          }
          return task;
        }),
      };
    case SET_ADD_TASK_INPUT_FOCUS:
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return { ...state, addTaskInputFocus: payload.bool };
      } else {
        return state;
      }
    default:
      return state;
  }
}
