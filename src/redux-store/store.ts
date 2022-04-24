import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import teamSlice from "./slices/teamFilterSlice";
import playOffSlice from "./slices/playOffSlice";

const store = configureStore({
  reducer: {
    filter: teamSlice,
    loginStatus : loginSlice,
    isPlayOff : playOffSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
