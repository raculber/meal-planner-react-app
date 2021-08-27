import classes from "./RecipeList.module.css";

import Recipe from "./Recipe";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/recipe-actions";

const RecipeList = (props) => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const recipeList = useSelector((state) => state.recipe.recipeList);
  let message = useSelector((state) => state.notification.message);
  console.log(message);

  useEffect(() => {
    dispatch(getRecipes(userId));
  }, [dispatch, userId, message]);

  return (
    <div className={classes.recipes}>
      {recipeList.map((recipe) => {
        return (
          <Recipe
            name={recipe.name}
            type={recipe.type}
            servings={recipe.servings}
            key={recipe.recipeId}
          />
        );
      })}
    </div>
  );
};

export default RecipeList;
