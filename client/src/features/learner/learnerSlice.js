import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    signUpError: false
}

const learnerSlice = createSlice({
    name: 'learner',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.loading = false,
                state.error = null

        },
        signInFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null,
            state.signUpError = null;
        },
    }
});

export const { signInStart, signInFailure, signInSuccess, clearError} = learnerSlice.actions

export default learnerSlice.reducer; //