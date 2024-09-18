import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { useCartProducts } from '../../../src/feat/get-cart';
import { MockFailingCartService } from '../../../src/shared/api/cart-service';

const Wrapper = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useCartProducts', () => {
    test('to be initially in loading state', async () => {
        const { result } = renderHook(() => useCartProducts(), {
            wrapper: Wrapper,
        });

        expect(result.current.isLoading).toBe(true);
    });

    test('to load data', async () => {
        const mockProducts = [
            { id: 1, title: 'Product 1' },
            { id: 2, title: 'Product 2' },
        ];

        vi.spyOn(
            MockFailingCartService.prototype,
            'getProductsInCart'
        ).mockResolvedValueOnce(mockProducts);

        const { result } = renderHook(() => useCartProducts(), {
            wrapper: Wrapper,
        });

        await waitFor(() => {
            return result.current.isLoading === false;
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(mockProducts);
    });
});
