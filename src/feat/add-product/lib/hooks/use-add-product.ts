import { useAddProductToCartMutation } from '../../../../entities/cart';
import { Product } from '../../../../shared/api/cart-service';

export type UseAddProductResult = {
  isLoading: boolean;
  execute: (title: string) => Promise<void>;
};

export type OptimisticProduct = Product & { isOptimistic?: boolean };

export const useAddProduct = (): UseAddProductResult => {
  const [addProduct, { isLoading }] = useAddProductToCartMutation();

  const execute = async (title: string) => {
    await addProduct(title);
  };

  return { isLoading, execute };
};
