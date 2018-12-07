import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/app";
import reducers from "./reducers";

// Needed for Hot Module Replacement
if (typeof module.hot !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById("app")
);
