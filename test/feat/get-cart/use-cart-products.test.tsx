import { withQueryProvider } from '../../../src/app/providers/with-query-provider';
import { renderHook, waitFor } from '@testing-library/react';
import { useCartProducts } from '../../../src/feat/get-cart/lib/hooks/use-cart-products';
import { PropsWithChildren } from 'react';

const Wrapper = withQueryProvider(({ children }: PropsWithChildren) => (
    <>{children}</>
));

describe('useCartProducts', () => {
    test('to be initially in loading state', async () => {
        const { result } = renderHook(() => useCartProducts(), {
            wrapper: Wrapper,
        });

        await waitFor(() => {
            return result.current.isLoading;
        });

        expect(result.current.isLoading).toBe(true);
    });
});
