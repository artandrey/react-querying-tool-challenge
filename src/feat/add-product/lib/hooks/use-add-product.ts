import { useAddProductToCartMutation } from '../../../../entities/cart';

export type UseAddProductResult = {
    isLoading: boolean;
    execute: (title: string) => Promise<void>;
};

export const useAddProduct = (): UseAddProductResult => {
    const [addProduct, { isLoading }] = useAddProductToCartMutation();

    const execute = async (title: string) => {
        await addProduct(title);
    };

    return { isLoading, execute };
};
