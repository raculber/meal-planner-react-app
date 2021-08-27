import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./sign-up-slice";
import notificationSlice from "./notifcation-slice";
import recipeSlice from "./recipe-slice";

export default configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    notification: notificationSlice.reducer,
    recipe: recipeSlice.reducer,
  },
});
