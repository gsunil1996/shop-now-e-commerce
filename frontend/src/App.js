import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/home/Home";
import Header from "./components/layouts/header/Header";
import SingleProductDetails from "./components/singleProductDetails/SingleProductDetails";
import Login from "./components/user/login/Login";
import { loadUser } from "./redux/actions/userActions";
import Register from "./components/user/register/Register";

const App = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState([1, 3000]);
  const [ratings, setRatings] = useState(0);
  const [page, setPage] = useState(1);

  const { isAuthenticated } = useSelector(state => state.auth);

  // persist user across application
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div>

      <Header search={search} setSearch={setSearch} category={category} price={price} ratings={ratings} setPage={setPage} />

      <Switch>
        <Route exact path="/">
          <Home
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
        </Route>
        <Route exact path="/product/:id"> <SingleProductDetails /> </Route>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/register"> <Register /> </Route>
        <Route>404 Page not found</Route>
      </Switch>
    </div>
  );
};

export default App;
