import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act, PropsWithChildren } from 'react';
import { useAddProduct } from '../../../src/feat/add-product';
import {
    MockFailingCartService,
    Product,
} from '../../../src/shared/api/cart-service';

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
});
