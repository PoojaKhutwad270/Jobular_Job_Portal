// import { configureStore } from "@reduxjs/toolkit"; 
// import authReducer from "../features/authSlice";

//     export const store = configureStore({
// reducer:{
//     auth:authReducer,
// }
//     })

 import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});   

