import { useQuery } from '@tanstack/react-query';
import { Product } from '../../../../shared/api/cart-service';
import { api } from '../../../../shared/api';

export type UseCartResult = {
    isLoading: boolean;
    data: Readonly<Product[]> | undefined;
    isError: boolean;
};

export const useCartProducts = (): UseCartResult => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cart'],
        queryFn: () => api().cart.getProductsInCart(),
    });

    return { data, isError, isLoading };
};
