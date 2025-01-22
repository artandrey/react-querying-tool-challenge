import { cartApi } from '../../../entities/cart/model';
import { api } from '../../../shared/api';
import { Product } from '../../../shared/api/cart-service';

export const extendedCartApi = cartApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableProducts: builder.query<Readonly<Product[]>, void>({
      query: () => ({
        fn: async () => {
          const data = await api().cart.getAvailableProducts();
          return data;
        },
      }),
      providesTags: ['AvailableProducts'],
    }),
  }),
});

export const { useGetAvailableProductsQuery } = extendedCartApi;
