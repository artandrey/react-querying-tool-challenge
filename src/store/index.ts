import { configureStore } from '@reduxjs/toolkit';
import { cartApi } from '../entities/cart';

export const setupStore = () => {
    const store = configureStore({
        reducer: {
            [cartApi.reducerPath]: cartApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(cartApi.middleware),
    });

    return store;
};

export const store = setupStore();
