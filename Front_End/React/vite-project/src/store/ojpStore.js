import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const ojpStore = configureStore({
  reducer: {
    loggedInUser: userSlice.reducer,
  },
});

export default ojpStore;
