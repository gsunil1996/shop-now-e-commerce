import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { adminGetProductsReducer, deleteProductReducer, getProductsReducer, getSingleProductDetailsReducer, newProductReducer, newReviewReducer, updateProductReducer } from "./reducers/productReducers";
import { authReducer, forgotPasswordReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  getProducts: getProductsReducer,
  getSingleProductDetails: getSingleProductDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  adminGetAllProducts: adminGetProductsReducer,
  adminGetAllOrders: allOrdersReducer,
  deleteProduct: deleteProductReducer,
  newProduct: newProductReducer,
  updateProduct: updateProductReducer,
});

const middlware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
