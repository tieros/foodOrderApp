import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    errorMessage: '',
    uid: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action){
            state.isLoggedIn = action.payload;
        },
        setErrorMessage(state, action){
            state.errorMessage = action.payload;
        },
        setUid(state, action){
            state.uid = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;