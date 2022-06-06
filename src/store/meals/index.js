import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meals: '',
}

const mealSlice = createSlice({
    name: "meal",
    initialState,
    reducers: {
        setMeals: (state, action) => {
            state.meals = action.payload;
        },
    },
});

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;