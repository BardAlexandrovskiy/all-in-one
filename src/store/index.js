// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { rootReducer } from "../reducers/index";
// import logger from "redux-logger";
// import thunk from "redux-thunk";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(logger, thunk))
// );

// export default store;

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
