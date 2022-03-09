import { createSlice } from '@reduxjs/toolkit'
import apis from './apis'

const initialState = {
  ingdts: [],

};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    loginSucceed: (state, action) => {
      localStorage.setItem('currentToken', action.payload);
    },
    addIngdtSucceed: (state, action) => {
      state.ingdts = [action.payload, ...state.ingdts];
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSucceed, addIngdtSucceed } = recipeSlice.actions

export const searchRecipe = (ingdts) => async dispatch => {
    try {
      const response = await apis.search(ingdts);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

export const addIngdt = (ingdt) => async dispatch => {
    try {
      dispatch(addIngdtSucceed(ingdt));
    } catch (err) {
      console.log(err);
    }
}

export default recipeSlice.reducer