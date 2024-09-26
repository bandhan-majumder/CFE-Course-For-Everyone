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
        },
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
        },
        signUpStart: (state) => {
            state.loading = true
            state.signUpError = null
        },
        singUpSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.loading = false,
                state.signUpError = null

        },
        singUpFailure: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.signUpError = action.payload
        }
    }
});

export const { signInStart, singInFailure, singInSuccess, signUpStart, singUpSuccess, singUpFailure, clearError } = creatorSlice.actions

export default creatorSlice.reducer; //