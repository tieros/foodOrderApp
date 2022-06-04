import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        sendToCart: (state, action) => {
            const { id, price, amount, name } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (amount === 0) {
                state.items = state.items.filter((item) => item.id !== id);

            } else if (existingItem) {
                existingItem.amount = amount;

            } else if (!existingItem) {
                state.items.push({
                    id,
                    price,
                    name,
                    amount,
                });
            }
        },
        clearCart: (state) => initialState,
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;