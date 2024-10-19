import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../../shared/api/cart-service';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Cart', 'AvailableProducts'],
  endpoints: (builder) => ({
    // should be implemented in the feature
    getCartProducts: builder.query<Product[], void>({
      queryFn: () => {
        throw new Error('Not implemented');
      },
    }),
  }),
});
