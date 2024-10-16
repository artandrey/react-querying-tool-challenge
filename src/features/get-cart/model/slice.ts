import { cartApi } from '../../../entities/cart/model';
import { api } from '../../../shared/api';
import { Product } from '../../../shared/api/cart-service';

export const extendedCartApi = cartApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartProducts: builder.query<Readonly<Product[]>, void>({
      queryFn: async () => {
        const data = await api().cart.getProductsInCart();
        return { data };
      },
      providesTags: ['Cart'],
    }),
  }),
  // that is needed to override the existing endpoint
  // in some cases we need to defined endpoints on our entity api client to make them available for the feature api client
  // it is something similar to abstract class method overriding
  overrideExisting: true,
});

export const { useGetCartProductsQuery } = extendedCartApi;
