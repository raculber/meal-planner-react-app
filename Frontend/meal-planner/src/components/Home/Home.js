import classes from "./Home.module.css";
import Header from "../UI/Header";
import Button from "../UI/Button";

import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notifcation-slice";

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signOutHandler = () => {
    localStorage.setItem("signedIn", false);
    localStorage.setItem("userId", null);
    dispatch(notificationActions.sendNotification({ message: "" }));
    props.loginChangeHandler();
    history.push("/sign-in");
  };
  return (
    <Header>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/home/recipes" activeClassName={classes.active}>
              Recipes
            </NavLink>
          </li>
        </ul>
      </nav>
      <Button
        content="Sign Out"
        buttonType="Sign Out"
        onClick={signOutHandler}
      />
    </Header>
  );
};

export default Home;
