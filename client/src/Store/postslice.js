import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  UserInfo: null,
  token: null,
  ShowPicker: false,
};
export const AsyncUserRegisterThunk = createAsyncThunk(
  "user/Register",
  async (params) => {
    const { data } = await axios.post(
      "http://localhost:5000/auth/register",
      params
    );
    return data;
  }
);
export const AsyncSignInThunk = createAsyncThunk(
  "user/SignIn",
  async (params) => {
    const { data } = await axios.post(
      "http://localhost:5000/auth/login",
      params
    );
    return data;
  }
);
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignOutReducer: (state, action) => {
      state.token = action.payload;
    },
    ReloadPageReducer: (state, action) => {
      state.UserInfo = action.payload.user;
      state.token = action.payload.token;
    },
    ChangeUserInfo: (state, action) => {
      state.UserInfo = action.payload;
    },
    HandleEmojiPicker: (state, action) => {
      state.ShowPicker = action.payload;
    },
  },
  extraReducers: {
    [AsyncUserRegisterThunk.fulfilled]: (state, action) => {
      state.UserInfo = action.payload._doc;
      state.token = action.payload.token;
    },
    [AsyncSignInThunk.fulfilled]: (state, action) => {
      state.UserInfo = action.payload.user;
      state.token = action.payload.token;
    },
  },
});
export const {
  SignOutReducer,
  ReloadPageReducer,
  ChangeUserInfo,
  HandleEmojiPicker,
} = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
