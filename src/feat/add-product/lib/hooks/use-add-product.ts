import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../shared/api';

export type UseAddProductResult = {
    isLoading: boolean;
    execute: (title: string) => Promise<void>;
};

export const useAddProduct = (): UseAddProductResult => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (title: string) => api().cart.addProductToCart(title),
    });

    const execute = async (title: string) => {
        await mutateAsync(title);
    };

    return { isLoading: isPending, execute };
};
