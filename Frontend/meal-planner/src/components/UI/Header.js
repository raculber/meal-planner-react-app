import classes from "./Header.module.css";

const Header = (props) => {
  return <section className={classes.header}>{props.children}</section>;
};

export default Header;
