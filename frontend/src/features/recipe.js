import { createSlice } from "@reduxjs/toolkit";
import apis from "./apis";

const initialState = {
  ingdts: [],
  cuisine: "",
  mealType: "",
  results: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    loginSucceed: (state, action) => {
      localStorage.setItem("currentToken", action.payload);
    },
    addIngdtSucceed: (state, action) => {
      state.ingdts = [action.payload, ...state.ingdts];
    },
    deleteIngdtSucceed: (state, action) => {
      for (var i = 0; i < state.ingdts.length; i++) {
        if (state.ingdts[i] === action.payload) {
          state.ingdts.splice(i, 1);
        }
      }
    },
    setCuisineSucceed: (state, action) => {
      state.cuisine = action.payload;
    },
    setMealTypeSucceed: (state, action) => {
      state.mealType = action.payload;
    },
    searchRecipeSucceed: (state, action) => {
      state.results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginSucceed,
  addIngdtSucceed,
  deleteIngdtSucceed,
  setCuisineSucceed,
  setMealTypeSucceed,
  searchRecipeSucceed,
} = recipeSlice.actions;

export const newLogin = (email) => async (dispatch) => {
  try {
    const response = await apis.login(email);
  } catch (err) {
    console.log(err.response);
  }
};

export const searchRecipe = (ingdts) => async (dispatch) => {
  try {
    const response = await apis.search(ingdts);
    console.log(response.data.hits);
    dispatch(searchRecipeSucceed(response.data.hits));
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const addIngdt = (ingdt) => async (dispatch) => {
  try {
    dispatch(addIngdtSucceed(ingdt));
  } catch (err) {
    console.log(err);
  }
};

export const deleteIngdt = (ingdt) => async (dispatch) => {
  try {
    dispatch(deleteIngdtSucceed(ingdt));
  } catch (err) {
    console.log(err);
  }
};

export const setCuisine = (cuisine) => async (dispatch) => {
  try {
    dispatch(setCuisineSucceed(cuisine));
  } catch (err) {
    console.log(err);
  }
};

export const setMealType = (mealType) => async (dispatch) => {
  try {
    dispatch(setMealTypeSucceed(mealType));
  } catch (err) {
    console.log(err);
  }
};

export const applyFilter = (cuisine, mealType, ingdts) => async (dispatch) => {
  try {
    if (cuisine !== "") {
      dispatch(setCuisineSucceed(cuisine));
    }

    if (mealType !== "") {
      dispatch(setMealTypeSucceed(mealType));
    }
    const response = await apis.filter(cuisine, mealType, ingdts);
    dispatch(searchRecipeSucceed(response.data.hits));
  } catch (err) {
    console.log(err);
  }
};

export const addFav = (recipe, email) => async (dispatch) => {
  try {
    const response = await apis.fav(recipe.image, recipe.url, recipe.label, email);
  } catch (err) {
    console.log(err)
  }
};

export default recipeSlice.reducer;
