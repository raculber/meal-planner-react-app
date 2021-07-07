import classes from "./SignUp.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Header from "../UI/Header";

import background from "../../images/thali.jpg";

import { notificationActions } from "../../store/notifcation-slice";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendUserData } from "../../store/sign-up-actions";

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

  const history = useHistory();
  const dispatch = useDispatch();
  let message = useSelector((state) => state.notification.message);

  const emailChangeHandler = (event) => {
    setValidateForm({ ...validateForm, enteredEmail: event.target.value });
  };

  useEffect(() => {
    if (message === "Success") history.push("./home");
  }, [message, history]);

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

    const { emailValid, passwordValid, reenteredPassValid } = validateForm;
    isInitial = false;
    if (emailValid && passwordValid && reenteredPassValid && !isInitial) {
      try {
        dispatch(sendUserData({ enteredEmail, enteredPassword }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelHandler = () => {
    history.push("/sign-in");
  };

  return (
    <div>
      <img className={classes.img} src={background} alt="Thali" />
      <Card>
        <header className={classes.header}>Sign-Up</header>
        <form onSubmit={submitFormHandler}>
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
            <p>Please enter a valid password</p>
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
            <p>Passwords must match</p>
          )}
          <Button type="submit" content="Create Account" />
        </form>
        <div className={classes.cancel} onClick={cancelHandler}>
          Cancel
        </div>
        <p>{message !== "Success" ? message : ""}</p>
      </Card>
    </div>
  );
};

export default SignUp;
