import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teams } from "./components/utills";

const isLogedIn = createSlice({
  name: "logInOut",
  initialState : false,
  reducers: {
    toggle: (state, action : PayloadAction<boolean>) =>{
      return action.payload
    }
  }
})

const LCKteams = createSlice({
  name: "teamFilter",
  initialState: teams,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      return [...state, action.payload];
    },
    remove : (state, action: PayloadAction<string>) =>{
      return state.filter(a=> a!==action.payload);
    }
  },
});

const playOffSeason = createSlice({
  name: "POseason",
  initialState : false,
  reducers: {
    changePeriod : (state, action : PayloadAction) =>{

    }
  }
})

const store = configureStore({
  reducer: {
    filter: LCKteams.reducer,
    loginStatus : isLogedIn.reducer
  },
});

export const { add, remove } = LCKteams.actions;
export const { toggle } = isLogedIn.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
