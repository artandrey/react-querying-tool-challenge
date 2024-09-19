import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../shared/api';
import { Product } from '../../../../shared/api/cart-service';

export type UseAddProductResult = {
    isLoading: boolean;
    execute: (title: string) => Promise<void>;
};

export const useAddProduct = (): UseAddProductResult => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (title: string) => api().cart.addProductToCart(title),
        onSuccess: (data) =>
            queryClient.setQueryData<Readonly<Product[]>>(['cart'], (old) =>
                old ? [...old, data] : undefined
            ),
    });

    const execute = async (title: string) => {
        await mutateAsync(title);
    };

    return { isLoading: isPending, execute };
};
