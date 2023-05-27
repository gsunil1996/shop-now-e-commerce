import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/layouts/header/Header";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/"> <Home /> </Route>
        <Route>404 Page not found</Route>
      </Switch>
    </div>
  );
}

export default App;
