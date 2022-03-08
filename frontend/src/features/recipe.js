import { createSlice } from '@reduxjs/toolkit'
import apis from './apis'

export const recipeSlice = createSlice({
  name: 'users',
  initialState: {
    value: 0,
  },
  reducers: {
    loginSucceed: (state, action) => {
      localStorage.setItem('currentToken', action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginSucceed } = recipeSlice.actions

export const searchRecipe = (ingdts) => async dispatch => {
    try {
      const response = await apis.search(ingdts);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

export default recipeSlice.reducer