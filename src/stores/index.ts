import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";


const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
  devTools: true
});

export default store;

export type State = ReturnType<typeof reducer>