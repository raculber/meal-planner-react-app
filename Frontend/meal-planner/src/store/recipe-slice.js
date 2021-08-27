import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipeList: [],
    count: 0,
  },
  reducers: {
    addRecipe(state, action) {
      const newRecipe = action.payload;
      state.recipeList.push({
        recipeId: newRecipe.recipeId,
        name: newRecipe.name,
        type: newRecipe.type,
        servings: newRecipe.servings,
      });
    },
    initializeRecipes(state, action) {
      state.recipeList = action.payload;
      state.count = state.recipeList.length;
    },
  },
});

export const { addRecipe, initializeRecipes } = recipeSlice.actions;
export default recipeSlice;
