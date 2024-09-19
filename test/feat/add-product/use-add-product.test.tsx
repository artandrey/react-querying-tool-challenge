import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act, PropsWithChildren } from 'react';
import { useAddProduct } from '../../../src/feat/add-product';
import {
    MockFailingCartService,
    Product,
} from '../../../src/shared/api/cart-service';
import { useCartProducts } from '../../../src/feat/get-cart';

const Wrapper = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useAddProduct', () => {
    test('should call api', async () => {
        const addProductToCartSpy = vi
            .spyOn(MockFailingCartService.prototype, 'addProductToCart')
            .mockResolvedValueOnce(new Product(1, 'test'));

        const { result } = renderHook(() => useAddProduct(), {
            wrapper: Wrapper,
        });

        act(() => {
            result.current.execute('test');
        });

        await waitFor(() => {
            return result.current.isLoading === false;
        });

        expect(result.current.isLoading).toBe(false);
        expect(addProductToCartSpy).toBeCalled();
    });

    test('should update products cache', async () => {
        const mockProducts = [
            { id: 1, title: 'Product 1' },
            { id: 2, title: 'Product 2' },
        ];

        const productToAdd = new Product(3, 'test');

        const addProductToCart = vi
            .spyOn(MockFailingCartService.prototype, 'addProductToCart')
            .mockResolvedValueOnce(productToAdd);

        vi.spyOn(
            MockFailingCartService.prototype,
            'getProductsInCart'
        ).mockResolvedValueOnce(mockProducts);

        const useCart = () => {
            const { execute, isLoading: isProductAdding } = useAddProduct();
            const { data, isLoading: isProductsLoading } = useCartProducts();

            return {
                addProduct: execute,
                isProductAdding,
                isProductsLoading,
                products: data,
            };
        };

        const { result } = renderHook(() => useCart(), {
            wrapper: Wrapper,
        });

        await waitFor(() => {
            return result.current.isProductsLoading === false;
        });

        expect(result.current.products).toEqual(mockProducts);

        const getUpdatedProductsInCartSpy = vi
            .spyOn(MockFailingCartService.prototype, 'getProductsInCart')
            .mockResolvedValueOnce([...mockProducts, productToAdd]);

        await act(() => result.current.addProduct('test'));

        await waitFor(() => {
            return result.current.products.length === 3;
        });

        expect(result.current.products).toContainEqual({
            id: 3,
            title: 'test',
        });

        expect(addProductToCart).toHaveBeenCalledOnce();

        expect(getUpdatedProductsInCartSpy).not.toBeCalled();
    });
});
