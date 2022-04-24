import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teams } from "../../components/utils/utils";

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
 
export const { add, remove } = LCKteams.actions

export default LCKteams.reducer