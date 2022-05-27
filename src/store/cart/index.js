import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action) {
            const { id, name, amount, price } = action.payload;
            const item = state.items.find(item => item.id === id);
            let updatedAmount;
            if (item) {
                updatedAmount = amount + 1;
                item.amount = updatedAmount;
            } else { 
                state.items.push({
                    id,
                    name,
                    amount: 1,
                    price,
                });    
                console.log(price)
                state.totalAmount += price;           
            }
            state.totalAmount = updatedAmount * price;
        },

        removeCartItem(state, action) {
            const { id, amount, price } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item.amount === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                item.amount = amount - 1;
            }
            state.totalAmount = amount * price;
        },
        clearCart: state => initialState
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
