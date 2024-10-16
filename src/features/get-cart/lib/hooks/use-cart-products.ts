import { useGetCartProductsQuery } from '../../model/slice';
import { Product } from '../../../../shared/api/cart-service';

export type UseCartResult = {
  isLoading: boolean;
  data: Readonly<Product[]> | undefined;
  isError: boolean;
};

export const useCartProducts = (): UseCartResult => {
  const { data, isLoading, isError } = useGetCartProductsQuery();

  return { data, isLoading, isError };
};
