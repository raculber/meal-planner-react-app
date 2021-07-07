import classes from "./SignIn.module.css";

import Card from "../UI/Card";
import Header from "../UI/Header";

import background from "../../images/food-background.jpg";

import { Fragment } from "react";

const SignIn = (props) => {
  return (
    <Fragment>
      <img className={classes.img} src={background} alt="Feast" />
      <Header title="Meal Planner" />
      <Card>
        <header>Sign-In</header>
        <form></form>
      </Card>
    </Fragment>
  );
};

export default SignIn;
