import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoggedIn = true;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
