// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { rootReducer } from "../reducers/index";
// import logger from "redux-logger";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(logger))
// );

// export default store;

import { createStore } from "redux";
import { rootReducer } from "../reducers/index";

const store = createStore(rootReducer);

export default store;
