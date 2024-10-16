import { Provider } from 'react-redux';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { act, PropsWithChildren } from 'react';
import { useCartProducts } from '../../../src/features/get-cart';
import { cartApi } from '../../../src/entities/cart';
import { setupStore } from '../../../src/store';
import { MockFailingCartService } from '../../../src/shared/api/cart-service';

const store = setupStore();

const Wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);

describe('useCartProducts', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
    act(() => store.dispatch(cartApi.util.resetApiState()));
  });

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
    ).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useCartProducts(), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockProducts);
  });
});
