import Axios from "axios";
import { notificationActions } from "./notifcation-slice";
import { initializeRecipes } from "./recipe-slice";

export const sendRecipeData = (recipeData) => {
  return (dispatch) => {
    dispatch(notificationActions.sendNotification({ message: "Loading..." }));
    Axios.post("http://localhost:3001/api/add-recipe", recipeData)
      .then((response) => {
        dispatch(
          notificationActions.sendNotification({ message: "Recipe Added" })
        );
      })
      .catch((error) => {
        dispatch(
          notificationActions.sendNotification({
            message: "Error Adding Recipe",
          })
        );
      });
  };
};

export const getRecipes = (userId) => {
  return (dispatch) => {
    dispatch(notificationActions.sendNotification({ message: "Loading..." }));
    Axios.get("http://localhost:3001/api/recipes", {
      params: { userId: userId },
    }).then((response) => {
      dispatch(initializeRecipes(response.data));
    });
  };
};
