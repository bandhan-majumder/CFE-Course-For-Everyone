import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const learnerSlice = createSlice({
    name: 'learner',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        singInSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.loading = false,
                state.error = null

        },
        singInFailure: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = action.payload
        }
    }
});

export const { signInStart, singInFailure, singInSuccess} = learnerSlice.actions

export default learnerSlice.reducer; //