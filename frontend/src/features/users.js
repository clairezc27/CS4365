import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
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
export const { loginSucceed } = usersSlice.actions

export const login = (token) => async dispatch => {
    try {
      dispatch(loginSucceed(token));
    } catch (err) {
    }
  };

export default usersSlice.reducer