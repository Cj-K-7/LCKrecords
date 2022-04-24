import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const isLogedIn = createSlice({
    name: "logInOut",
    initialState : false,
    reducers: {
      authStateToggle: (state, action : PayloadAction<boolean>) =>{
        return action.payload
      }
    }
  })

export const { authStateToggle } = isLogedIn.actions

export default isLogedIn.reducer