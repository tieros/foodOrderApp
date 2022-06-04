import { createSlice } from "@reduxjs/toolkit";
import { PURGE, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    user: {
        token: '',
        uid: '',
        isLoggedIn: false,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
        },
        logoutUser: (state) => initialState,
    },
    extraReducers: (builder) => {
            builder.addCase(PURGE, (state) => {
                storage.removeItem('persist:user');
                return initialState
            });
            builder.addCase(PERSIST, (state) => {
                storage.setItem('persist:user');
            })
       
    },});

export const authActions = authSlice.actions;
export default authSlice.reducer;