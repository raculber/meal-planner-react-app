import SignUp from "./components/SignIn/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import Recipes from "./components/Recipes/Recipes";

import { Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("signedIn")
  );
  const loginChangeHandler = () => {
    setIsLoggedIn(localStorage.getItem("signedIn"));
  };
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/sign-in" />
        </Route>
        <Route path="/sign-in">
          {isLoggedIn !== "true" && (
            <SignIn loginChangeHandler={loginChangeHandler} />
          )}
        </Route>
        <Route path="/sign-up">
          {isLoggedIn !== "true" && (
            <SignUp loginChangeHandler={loginChangeHandler} />
          )}
        </Route>
        <Route path="/home/recipes">
          {isLoggedIn && <Recipes loginChangeHandler={loginChangeHandler} />}
        </Route>
        <Route path="/home" exact>
          {isLoggedIn && <Home loginChangeHandler={loginChangeHandler} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
