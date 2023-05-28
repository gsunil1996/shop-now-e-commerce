import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getProductsReducer, getSingleProductDetailsReducer } from "./reducers/productReducers";
import { authReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  getProducts: getProductsReducer,
  getSingleProductDetails: getSingleProductDetailsReducer,
  auth: authReducer
});

const middlware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
