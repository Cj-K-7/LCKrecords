import { configureStore, createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

const springDataSlice = createSlice(
    {name: 'spring',
    initialState: <DocumentData>[],
    reducers: {
        setData(state, action){
            state.push(action.payload)
        }
    }
}
)

const store = configureStore({
    reducer : {
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store