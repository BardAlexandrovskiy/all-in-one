import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers/index.ts";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store =
  process.env.NODE_ENV !== "production" && false
    ? createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(logger, thunk))
      )
    : createStore(rootReducer, applyMiddleware(thunk));

export default store;
