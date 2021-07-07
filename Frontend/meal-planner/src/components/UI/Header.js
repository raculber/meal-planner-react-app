import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <section className={classes.header}>
      <h2>{props.title}</h2>
    </section>
  );
};

export default Header;
