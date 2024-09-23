import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../shared/api';
import { Product } from '../../../../shared/api/cart-service';

export type UseAddProductResult = {
    isLoading: boolean;
    execute: (title: string) => Promise<void>;
};

export type OptimisticProduct = Product & { isOptimistic?: boolean };

export const useAddProduct = (): UseAddProductResult => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (title: string) => api().cart.addProductToCart(title),
        retry: 2,
        onSuccess: (data) =>
            queryClient.setQueryData<Readonly<OptimisticProduct[]>>(
                ['cart'],
                (old) =>
                    old && [
                        ...old.filter((product) => !product.isOptimistic),
                        data,
                    ]
            ),
        onMutate: (title: string) => {
            const id = Date.now();
            queryClient.setQueryData<Readonly<OptimisticProduct[]>>(
                ['cart'],
                (old) =>
                    old && [
                        ...old,
                        {
                            id,
                            title,
                            isOptimistic: true,
                        },
                    ]
            );
            return id;
        },
        onError: (error, title, id) => {
            queryClient.setQueryData<Readonly<OptimisticProduct[]>>(
                ['cart'],
                (old) => old?.filter((product) => product.id !== id)
            );
        },
    });

    const execute = async (title: string) => {
        await mutateAsync(title);
    };

    return { isLoading: isPending, execute };
};
