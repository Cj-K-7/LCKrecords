import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teams } from "./components/utills";

const springDataSlice = createSlice({
  name: "filter",
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

const store = configureStore({
  reducer: {
    filter: springDataSlice.reducer,
  },
});

export const { add, remove } = springDataSlice.actions;
export const arr = springDataSlice.getInitialState;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
