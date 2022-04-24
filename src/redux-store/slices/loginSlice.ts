import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const isLogedIn = createSlice({
    name: "logInOut",
    initialState : false,
    reducers: {
      toggle: (state, action : PayloadAction<boolean>) =>{
        return action.payload
      }
    }
  })

export const { toggle } = isLogedIn.actions

export default isLogedIn.reducer