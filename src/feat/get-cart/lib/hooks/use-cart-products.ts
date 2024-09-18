import { Product } from '../../../../shared/api/cart-service';

export type UseCartResult = {
    isLoading: boolean;
    data: Product[] | undefined;
    isError: boolean;
};

export const useCartProducts = (): UseCartResult => {
    return {
        data: [],
        isError: false,
        isLoading: true,
    };
};
