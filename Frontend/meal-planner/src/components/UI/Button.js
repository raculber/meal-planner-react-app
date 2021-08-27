import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={
        props.buttonType === "Add"
          ? classes.add
          : props.buttonType === "Sign Out"
          ? classes.signout
          : classes.signin
      }
      onClick={props.onClick}
      form={props.form}
      disabled={props.isDisabled}
    >
      {props.content}
    </button>
  );
};

export default Button;
