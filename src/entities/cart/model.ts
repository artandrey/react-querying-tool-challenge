import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../../shared/api';
import { Product } from '../../shared/api/cart-service';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Cart', 'AvailableProducts'],
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
        try {
          const product = await queryFulfilled;
          dispatch(
            cartApi.util.updateQueryData(
              'getCartProducts',
              undefined,
              (draft) => [...draft, product.data]
            )
          );
        } catch (error) {
          console.error('Failed to update cart', error);
        }
      },
    }),
    getAvailableProducts: builder.query<Readonly<Product[]>, void>({
      queryFn: async () => {
        const data = await api().cart.getAvailableProducts();
        return { data };
      },
      providesTags: ['AvailableProducts'],
    }),
  }),
});

// Export the generated hook
export const { useGetAvailableProductsQuery } = cartApi;
