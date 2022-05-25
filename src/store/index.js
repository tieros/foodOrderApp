import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import ui from './ui';
import cart from './cart';

export const store = configureStore({
    reducer: {
        ui,
        auth,
        cart
    }
})