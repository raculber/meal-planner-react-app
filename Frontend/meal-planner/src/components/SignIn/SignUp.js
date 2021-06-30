import classes from "./SignUp.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import background from "../../images/thali.jpg";

import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [validateForm, setValidateForm] = useState({
    enteredEmail: "",
    emailValid: true,
    enteredPassword: "",
    reenteredPass: "",
    passwordValid: true,
    reenteredPassValid: true,
  });
  const history = useHistory();

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
  };

  const cancelHandler = () => {
    history.push("/sign-in");
  };

  return (
    <div>
      <img className={classes.img} src={background} alt="Thali" />
      <Card>
        <header className={classes.header}>Sign-Up</header>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <label htmlFor="email" id="email">
            Enter Your Email
          </label>
          <input
            className={!validateForm.emailValid ? classes.invalid : ""}
            type="text"
            id="email"
            onChange={emailChangeHandler}
          ></input>
          {!validateForm.emailValid && (
            <p className={classes.error}>Please enter a valid Email</p>
          )}
          <label htmlFor="password" id="password">
            Enter Your Password
          </label>
          <input
            className={!validateForm.passwordValid ? classes.invalid : ""}
            type="text"
            id="password"
            onChange={passwordChangeHandler}
          ></input>
          {!validateForm.passwordValid && <p>Please enter a valid password</p>}
          <label htmlFor="passwordretype" id="passwordretype">
            Re-Type Password
          </label>
          <input
            className={!validateForm.reenteredPassValid ? classes.invalid : ""}
            type="text"
            id="passwordretype"
            onChange={passReenterChangeHangler}
          ></input>
          {!validateForm.reenteredPassValid && <p>Passwords must match</p>}
          <Button type="submit" content="Create Account" />
        </form>
        <div className={classes.cancel} onClick={cancelHandler}>
          Cancel
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
