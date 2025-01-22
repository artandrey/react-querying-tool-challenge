import {
  BaseQueryFn,
  createApi,
  fakeBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';
import { Product } from '../../../shared/api/cart-service';

const staggeredBaseQueryWithBailOut = retry(
  async (args: undefined, api, extraOptions) => {
    const result = await fakeBaseQuery()(args, api, extraOptions);

    return result;
  },
  {
    maxRetries: 5,
  }
);

export interface TestQueryArgs {
  fn: () => any;
}

export const baseQuery: BaseQueryFn<TestQueryArgs> = retry(
  async (args, api, extraOptions) => {
    try {
      const response = await args.fn();
      if (response) {
        return { data: response };
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error: any) {
      console.log(error);

      const status = error.status || 500;
      const message = error.message || 'Internal Server Error';
      return { error: { status, message } };
    }
  },
  {
    maxRetries: 5,
  }
);
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQuery,
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
