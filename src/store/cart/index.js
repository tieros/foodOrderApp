import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        sendToCart: (state, action) => {
            const { id, price, amount } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (amount === 0) {
                state.items = state.items.filter((item) => item.id !== id);
                state.totalAmount -= price;
            } else if (existingItem) {
                existingItem.amount = amount;
                state.totalAmount = amount * price;
                // if existingItem.amount > amount ( state.totalAmount += amount * price)
                // if existingItem.amount < amount ( state.totalAmount -= existingItem.amount * price)
            } else if (!existingItem) {
                state.items.push({
                    id,
                    price,
                    amount,
                });
                state.totalAmount += price * amount;
            }
        },
        clearCart: (state) => initialState,
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

        // addCartItem(state, action) {
        //     const { id, name, amount, price } = action.payload;
        //     console.log(amount + "carta ilk geldiği durum")
        //     const item = state.items.find(item => item.id === id);
        //     let updatedAmount;
        //     if (item) {
        //         updatedAmount = amount + 1;
        //         item.amount = updatedAmount;
        //         state.totalAmount = updatedAmount * price;
        //         console.log(state.totalAmount + '1  totalAmount');
        //     } else { 
        //         updatedAmount = 1;
        //         state.items.push({
        //             id,
        //             name,
        //             amount: updatedAmount,
        //             price,
        //         });    
        //         console.log(amount + " amount")
        //         state.totalAmount = price * amount; 
        //         console.log(state.totalAmount + "  2totalAmount")
        //     }
        //     console.log(state.totalAmount + '  3totalAmount');
        //     state.totalAmount = amount * price;
        // },

        // removeCartItem(state, action) {
        //     const { id, amount, price } = action.payload;
        //     const item = state.items.find(item => item.id === id);
        //     if (item.amount === 1) {
        //         state.items = state.items.filter(item => item.id !== id);
        //     } else {
        //         item.amount = amount - 1;
        //     }
        //     state.totalAmount = amount * price;
        // },