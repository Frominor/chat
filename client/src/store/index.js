import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./postslice";
const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
export default store;
