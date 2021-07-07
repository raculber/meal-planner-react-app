import classes from "./Home.module.css";
import Header from "../UI/Header";

const Home = (props) => {
  return (
    <div className={classes.home}>
      <Header>
        <h2>Meal Planner</h2>
      </Header>
    </div>
  );
};

export default Home;
