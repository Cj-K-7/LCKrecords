import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const playOffSeason = createSlice({
  name: "POseason",
  initialState: false,
  reducers: {
    changePeriod: (state, action: PayloadAction) => {},
  },
});

export const { changePeriod } = playOffSeason.actions

export default playOffSeason.reducer