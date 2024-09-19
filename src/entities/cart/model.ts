import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../shared/api/cart-service';
import { api } from '../../shared/api';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCartProducts: builder.query<Readonly<Product[]>, void>({
            queryFn: async () => {
                const data = await api().cart.getProductsInCart();
                return { data };
            },
            providesTags: ['Cart'],
        }),
        addProductToCart: builder.mutation<Product, string>({
            queryFn: async (title) => {
                const data = await api().cart.addProductToCart(title);
                return { data };
            },
            async onQueryStarted(_title, { dispatch, queryFulfilled }) {
                const product = await queryFulfilled;
                dispatch(
                    cartApi.util.updateQueryData(
                        'getCartProducts',
                        undefined,
                        (draft) => [...draft, product.data]
                    )
                );
            },
        }),
    }),
});
