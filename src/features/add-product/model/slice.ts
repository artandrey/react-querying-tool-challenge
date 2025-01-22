import { cartApi } from '../../../entities/cart/model';
import { api } from '../../../shared/api';
import { Product } from '../../../shared/api/cart-service';
// https://medium.com/@binura.owin1/using-redux-toolkit-query-with-custom-base-query-b565111ffffa#:~:text=A%20custom%20base%20query%20in%20Redux%20Toolkit%20Query%20is%20a,within%20the%20RTK%20Query%20library.
export const extendedCartApi = cartApi.injectEndpoints({
  endpoints: (builder) => ({
    addProductToCart: builder.mutation<Product, string>({
      query: (title) => ({
        fn: async () => {
          const data = await api().cart.addProductToCart(title);
          return data;
        },
      }),

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
