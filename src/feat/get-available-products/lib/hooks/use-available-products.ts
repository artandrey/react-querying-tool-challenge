import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../shared/api';
import { Product } from '../../../../shared/api/cart-service';

export interface AvailableProductsResult {
  data: Readonly<Product[]> | undefined;
  isLoading: boolean;
  error: unknown;
}

export const useAvailableProducts = (): AvailableProductsResult => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['availableProducts'],
    queryFn: () => api().cart.getAvailableProducts(),
    refetchInterval: 4000,
  });

  return {
    data,
    isLoading,
    error,
  };
};
