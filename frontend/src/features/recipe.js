import { createSlice } from "@reduxjs/toolkit";
import apis from "./apis";

const initialState = {
  ingdts: [],
  cuisine: "",
  mealType: "",
  results: [],
  favs: [],
  saved: [],
  completed: [],
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
    fetchFavsSucceed: (state, action) => {
      state.favs = action.payload;
    },
    fetchSavedSucceed: (state, action) => {
      state.saved = action.payload;
    },
    fetchCompletedSucceed: (state, action) => {
      state.completed = action.payload;
    }
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
  fetchFavsSucceed,
  fetchSavedSucceed,
  fetchCompletedSucceed,
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
    console.log(err);
  }
};

export const getFavs = (email) => async (dispatch) => {
  try {
    const response = await apis.getFavs(email);
    dispatch(fetchFavsSucceed(response.data));
  } catch (err) {
    console.log(err);
  }
}

export const unfav = (email, label) => async (dispatch) => {
  try {
    const response = await apis.unfav(email, label);
    dispatch(fetchFavsSucceed(response.data));
  } catch (err) {
    console.log(err);
  }
}

export const addSaved = (recipe, email) => async (dispatch) => {
  try {
    const response = await apis.save(recipe.image, recipe.url, recipe.label, email);
  } catch (err) {
    console.log(err);
  }
};

export const getSaved = (email) => async (dispatch) => {
  try {
    const response = await apis.getSaved(email);
    dispatch(fetchSavedSucceed(response.data));
  } catch (err) {
    console.log(err);
  }
}

export const unsave = (email, label) => async (dispatch) => {
  try {
    const response = await apis.unsave(email, label);
    dispatch(fetchSavedSucceed(response.data));
  } catch (err) {
    console.log(err);
  }
}

export const complete = (recipe, email) => async (dispatch) => {
  try {
    const response = await apis.complete(recipe.image, recipe.url, recipe.label, email);
    dispatch(fetchSavedSucceed(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const getComplete = (email) => async (dispatch) => {
  try {
    const response = await apis.getCompleted(email);
    dispatch(fetchCompletedSucceed(response.data));
  } catch (err) {
    console.log(err);
  }
};

export default recipeSlice.reducer;
