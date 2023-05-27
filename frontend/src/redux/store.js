import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getProductsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  getProducts: getProductsReducer
});

const middlware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
