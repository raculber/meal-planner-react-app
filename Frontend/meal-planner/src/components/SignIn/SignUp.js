import classes from "./SignUp.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Header from "../UI/Header";

import background from "../../images/thali.jpg";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendUserData } from "../../store/sign-up-actions";
import { notificationActions } from "../../store/notifcation-slice";

let isInitial = true;
const SignUp = (props) => {
  const [validateForm, setValidateForm] = useState({
    enteredEmail: "",
    emailValid: false,
    enteredPassword: "",
    reenteredPass: "",
    passwordValid: false,
    reenteredPassValid: false,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  let id = useSelector((state) => state.notification.optional);
  let message = useSelector((state) => state.notification.message);

  useEffect(() => {
    if (message === "Success") {
      localStorage.setItem("signedIn", true);
      localStorage.setItem("userId", id);
      props.loginChangeHandler();
      history.push("/home/recipes?userId=" + id);
    }
  }, [message, id, history, dispatch, props]);

  const emailChangeHandler = (event) => {
    setValidateForm({ ...validateForm, enteredEmail: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setValidateForm({
      ...validateForm,
      enteredPassword: event.target.value,
    });
  };

  const passReenterChangeHangler = (event) => {
    setValidateForm({
      ...validateForm,
      reenteredPass: event.target.value,
    });
  };
  const { enteredEmail, enteredPassword, reenteredPass } = validateForm;

  const submitFormHandler = (event) => {
    event.preventDefault();
    setValidateForm({
      ...validateForm,
      emailValid: enteredEmail.includes("@"),
      passwordValid: enteredPassword.trim().length !== 0,
      reenteredPassValid: enteredPassword === reenteredPass,
    });
    isInitial = false;
  };
  const { emailValid, passwordValid, reenteredPassValid } = validateForm;
  if (emailValid && passwordValid && reenteredPassValid && !isInitial) {
    setIsDisabled(true);
    try {
      dispatch(sendUserData({ enteredEmail, enteredPassword }));
      isInitial = true;
    } catch (error) {
      console.log(error);
    }
    setIsDisabled(false);
  }
  //message = useSelector((state) => state.notification.message);
  const cancelHandler = () => {
    dispatch(notificationActions.sendNotification({ message: "" }));
    history.push("/sign-in");
  };

  return (
    <div>
      <img className={classes.img} src={background} alt="Thali" />
      <Header>
        <h2>Meal Planner</h2>
      </Header>
      <Card>
        <header className={classes.header}>Sign-Up</header>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <label htmlFor="email" id="email">
            Enter Your Email
          </label>
          <input
            className={
              !validateForm.emailValid && !isInitial ? classes.invalid : ""
            }
            type="text"
            id="email"
            onChange={emailChangeHandler}
          ></input>
          {!validateForm.emailValid && !isInitial && (
            <p className={classes.error}>Please enter a valid Email</p>
          )}
          <label htmlFor="password" id="password">
            Enter Your Password
          </label>
          <input
            className={
              !validateForm.passwordValid && !isInitial ? classes.invalid : ""
            }
            type="text"
            id="password"
            onChange={passwordChangeHandler}
          ></input>
          {!validateForm.passwordValid && !isInitial && (
            <p className={classes.error}>Please enter a valid password</p>
          )}
          <label htmlFor="passwordretype" id="passwordretype">
            Re-Type Password
          </label>
          <input
            className={
              !validateForm.reenteredPassValid && !isInitial
                ? classes.invalid
                : ""
            }
            type="text"
            id="passwordretype"
            onChange={passReenterChangeHangler}
          ></input>
          {!validateForm.reenteredPassValid && !isInitial && (
            <p className={classes.error}>Passwords must match</p>
          )}
          <Button
            isDisabled={isDisabled}
            type="submit"
            content="Create Account"
          />
        </form>
        <div className={classes.cancel} onClick={cancelHandler}>
          Cancel
        </div>
        <p className={classes.error}>{message !== "Success" ? message : ""}</p>
      </Card>
    </div>
  );
};

export default SignUp;
