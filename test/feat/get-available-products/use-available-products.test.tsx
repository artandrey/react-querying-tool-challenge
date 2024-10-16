import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { useAvailableProducts } from '../../../src/feat/get-available-products/lib/hooks/use-available-products';
import {
  MockFailingCartService,
  Product,
} from '../../../src/shared/api/cart-service';

const Wrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAvailableProducts', () => {
  test('should be initially in loading state', () => {
    const { result } = renderHook(() => useAvailableProducts(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });

  test('should load data', async () => {
    const mockProducts: Product[] = [
      new Product(1, 'Product 1'),
      new Product(2, 'Product 2'),
    ];

    vi.spyOn(
      MockFailingCartService.prototype,
      'getAvailableProducts'
    ).mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useAvailableProducts(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      return result.current.isLoading === false;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockProducts);
  });
});
