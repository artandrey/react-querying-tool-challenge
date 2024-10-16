import { useGetAvailableProductsQuery } from '../../model/slice';
import { Product } from '../../../../shared/api/cart-service';

export interface AvailableProductsResult {
  data: Readonly<Product[]> | undefined;
  isLoading: boolean;
  error: unknown;
}

export const useAvailableProducts = (): AvailableProductsResult => {
  const { data, isLoading, error } = useGetAvailableProductsQuery();

  return { data, isLoading, error };
};
