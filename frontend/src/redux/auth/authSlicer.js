import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestLoading: state => {
      state.isLoggedIn = false;
      state.isLoading = true;
    },
    requestFailed: () => initialState,
    requestSuccess: (state, action) => {
      state.current = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isSuccess = true;
    },
    registerSuccess: () => ({
      ...initialState,
      isSuccess: true,
    }),
    logoutSuccess: () => initialState,
    logoutFailed: (state, action) => {
      state.current = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

export const {
  requestLoading,
  requestFailed,
  requestSuccess,
  registerSuccess,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
