import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLearner: null,
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
            console.log("Normal learner sign in ", action.payload)
            state.currentLearner = action.payload,
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
        googleSignInSuccess: (state, action) => {
            console.log("Google learner sign in ", action.payload)
            state.currentLearner = action.payload
        },
        logoutLearner: (state) => {
            state.currentLearner = null
        }
    }
});

export const { signInStart, signInFailure, signInSuccess, clearError, googleSignInSuccess, logoutLearner} = learnerSlice.actions

export default learnerSlice.reducer; //