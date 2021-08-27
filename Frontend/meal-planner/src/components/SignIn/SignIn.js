import classes from "./SignIn.module.css";

import Card from "../UI/Card";
import Header from "../UI/Header";
import Button from "../UI/Button";

import background from "../../images/food-background.jpg";

import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateSignIn } from "../../store/sign-up-actions";
import { notificationActions } from "../../store/notifcation-slice";

let isInitial = true;
const SignIn = (props) => {
  const [validateForm, setValidateForm] = useState({
    isValid: true,
    enteredPassword: "",
    enteredEmail: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  let message = useSelector((state) => state.notification.message);
  let id = useSelector((state) => state.notification.optional);

  useEffect(() => {
    if (message === "Success" && !isInitial) {
      console.log("in effect");
      localStorage.setItem("signedIn", true);
      localStorage.setItem("userId", id);
      props.loginChangeHandler();
      isInitial = true;
      dispatch(notificationActions.sendNotification({ message: "" }));
      history.push("/");
      history.replace("/home/recipes?userId=" + id);
    }
  }, [message, id, history, props, dispatch]);

  const emailChangeHandler = (event) => {
    setValidateForm({
      ...validateForm,
      enteredEmail: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setValidateForm({
      ...validateForm,
      enteredPassword: event.target.value,
    });
  };
  const { enteredEmail, enteredPassword } = validateForm;
  const submitFormHandler = (event) => {
    event.preventDefault();
    // setValidateForm({
    //   ...validateForm,
    //   emailValid: enteredEmail.includes("@"),
    //   passwordValid: enteredPassword.trim().length !== 0,
    // });

    // const { emailValid, passwordValid } = validateForm;
    setIsDisabled(true);
    isInitial = false;

    if (!isInitial) {
      try {
        dispatch(validateSignIn({ enteredEmail, enteredPassword }));

        setValidateForm({ ...validateForm, isValid: false });
      } catch (error) {
        console.log(error);
      }
    }
    setIsDisabled(false);
  };

  const resetMessage = () => {
    dispatch(notificationActions.sendNotification({ message: "" }));
  };
  return (
    <div className={classes.signIn}>
      <img className={classes.img} src={background} alt="Feast" />
      <Header>
        <h2>Meal Planner</h2>
      </Header>
      <Card>
        <header>Sign-In</header>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <label htmlFor="email" id="email">
            E-mail
          </label>
          <input
            className={!validateForm.isValid ? classes.invalid : ""}
            type="text"
            id="email"
            onChange={emailChangeHandler}
          />
          <label htmlFor="password" id="password">
            Password
          </label>
          <input
            className={!validateForm.isValid ? classes.invalid : ""}
            type="text"
            id="password"
            onChange={passwordChangeHandler}
          />
          <Button isDisabled={isDisabled} type="submit" content="Sign In" />
        </form>
        <p className={classes.error}>{message !== "Success" ? message : ""}</p>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                onClick={resetMessage}
                to="/sign-up"
                activeClassName={classes.active}
              >
                Create Account
              </NavLink>
            </li>
          </ul>
        </nav>
      </Card>
    </div>
  );
};

export default SignIn;
