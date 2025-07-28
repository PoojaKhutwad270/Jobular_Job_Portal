

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFail(state, action) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFail, logout } = userSlice.actions;
export default userSlice.reducer;
