import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    signUpError: false
}

const creatorSlice = createSlice({
    name: 'creator',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null,
            state.signUpError = null;
            state.loading = null
        },
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
            state.currentUser = action.payload,
            state.loading = false,
            state.error = action.payload
        },
        signUpStart: (state) => {
            state.loading = true
            state.signUpError = null
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.loading = false,
                state.signUpError = null

        },
        signUpFailure: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.signUpError = action.payload
        }
    }
});

export const { signInStart, signInFailure, signInSuccess, signUpStart, signUpSuccess, signUpFailure, clearError } = creatorSlice.actions

export default creatorSlice.reducer; //