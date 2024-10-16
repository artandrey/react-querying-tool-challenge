import { cartApi } from '../../../entities/cart/model';
import { api } from '../../../shared/api';
import { Product } from '../../../shared/api/cart-service';

export const extendedCartApi = cartApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useAddProductToCartMutation } = extendedCartApi;
