import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const springDataSlice = createSlice({
  name: "filter",
  initialState: ["all"],
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
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
