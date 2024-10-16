import { Product } from '../../../../shared/api/cart-service';

export interface AvailableProductsResult {
  data: Readonly<Product[]> | undefined;
  isLoading: boolean;
  error: unknown;
}

export const useAvailableProducts = (): AvailableProductsResult => {};
