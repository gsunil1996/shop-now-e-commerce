import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/home/Home";
import Header from "./components/layouts/header/Header";
import SingleProductDetails from "./components/singleProductDetails/SingleProductDetails";
import Login from "./components/user/login/Login";
import { loadUser } from "./redux/actions/userActions";
import Register from "./components/user/register/Register";
import Profile from "./components/user/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotFound from "./components/404/PageNotFound";
import UpdateProfile from "./components/user/updateProfile/UpdateProfile";
import UpdatePassword from "./components/user/updatePassword/UpdatePassword";
import ForgotPassword from "./components/user/forgotPassword/ForgotPassword";
import NewPassword from "./components/user/newPassword/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/shipping/Shipping";
import Payment from "./components/payment/Payment";
import ConfirmOrder from "./components/confirmOrder/ConfirmOrder";
import axios from 'axios'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from "./components/orderSuccess/OrderSuccess";
import ListOrders from "./components/listOrders/ListOrders";
import OrderDetails from "./components/orderDetails/OrderDetails";

const App = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState([1, 3000]);
  const [ratings, setRatings] = useState(0);
  const [page, setPage] = useState(1);

  const { isAuthenticated } = useSelector(state => state.auth);
  const [stripeApiKey, setStripeApiKey] = useState('');

  // persist user across application
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }

    async function getStripApiKey() {
      const { data } = await axios.get('http://localhost:4000/api/v1/stripeapi', { withCredentials: true });

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [dispatch, isAuthenticated]);

  return (
    <div>

      <Header search={search} setSearch={setSearch} category={category} price={price} ratings={ratings} setPage={setPage} />

      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              {...props}
              search={search}
              category={category}
              setCategory={setCategory}
              price={price}
              setPrice={setPrice}
              ratings={ratings}
              setRatings={setRatings}
              page={page}
              setPage={setPage}
            />
          )}
        />
        <Route path="/product/:id" component={SingleProductDetails} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} />
        <ProtectedRoute path="/profile" component={Profile} exact />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} />
        <ProtectedRoute path="/profile/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact />


        <Route path="/orders/me" component={ListOrders} exact />
        <Route path="/order/:id" component={OrderDetails} exact />



        {stripeApiKey &&
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        }

        <Route path="*" component={PageNotFound} />

      </Switch>
    </div>
  );
};

export default App;
