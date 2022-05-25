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
            const { id, price, amount, item } = action.payload;
            const updatedTotalAmount = state.totalAmount + price * amount;

            const existingCartItemIndex = state.items.findIndex((item) => item.id === id);
            const existingCartItem = state.items[existingCartItemIndex];
        
            let updatedItems;
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(item);
            }
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        },
        removeCartItem(state, action) {
            const { id } = action.payload;

            const existingCartItemIndex = state.items.findIndex((item) => item.id === id);
            const existingItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            
            let updatedItems;
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter((item) => item.id !== id);
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        },
        clearCart: state => initialState
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
