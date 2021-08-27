import classes from "./Recipes.module.css";

import Home from "../Home/Home";
import Button from "../UI/Button";
import AddRecipe from "./AddRecipe";
import RecipeList from "./RecipeList";

import { useState } from "react";

const Recipes = (props) => {
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const addRecipeHandler = (event) => {
    setShowAddRecipe(true);
  };
  const modalExitHandler = () => {
    setShowAddRecipe(false);
  };
  return (
    <div>
      <Home loginChangeHandler={props.loginChangeHandler} />
      <div className={classes.editRecipes}>
        <Button
          buttonType="Add"
          content="Add Recipe +"
          onClick={addRecipeHandler}
        />
        <select defaultValue="All" id="type">
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      {showAddRecipe && <AddRecipe modalExitHandler={modalExitHandler} />}
      <RecipeList />
    </div>
  );
};

export default Recipes;
