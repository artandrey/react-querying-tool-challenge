import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { act, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { useAvailableProducts } from '../../../src/feat/get-available-products/lib/hooks/use-available-products';
import {
  MockFailingCartService,
  Product,
} from '../../../src/shared/api/cart-service';
import { setupStore } from '../../../src/store';
import { cartApi } from '../../../src/entities/cart';

const store = setupStore();

const Wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);

describe('useAvailableProducts', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
    act(() => store.dispatch(cartApi.util.resetApiState()));
  });

  test('should be initially in loading state', () => {
    const { result } = renderHook(() => useAvailableProducts(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });

  test('should load data', async () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];

    vi.spyOn(
      MockFailingCartService.prototype,
      'getAvailableProducts'
    ).mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useAvailableProducts(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      return expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockProducts);
  });
});
