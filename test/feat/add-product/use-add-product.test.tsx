import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { act, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { cartApi } from '../../../src/entities/cart';
import { useAddProduct } from '../../../src/features/add-product';
import { useCartProducts } from '../../../src/features/get-cart';
import { MockFailingCartService } from '../../../src/shared/api/cart-service';
import { setupStore } from '../../../src/store';

const store = setupStore();

const Wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);

describe('useAddProduct', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
    act(() => store.dispatch(cartApi.util.resetApiState()));
  });

  test('should call api', async () => {
    const addProductToCartSpy = vi
      .spyOn(MockFailingCartService.prototype, 'addProductToCart')
      .mockResolvedValueOnce({ id: 1, title: 'test' });

    const { result } = renderHook(() => useAddProduct(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await result.current.execute('test');
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

    const productToAdd = { id: 3, title: 'test' };

    const addProductToCart = vi
      .spyOn(MockFailingCartService.prototype, 'addProductToCart')
      .mockResolvedValue(productToAdd);

    vi.spyOn(
      MockFailingCartService.prototype,
      'getProductsInCart'
    ).mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(
      () => {
        const { execute, isLoading: isProductAdding } = useAddProduct();
        const { data, isLoading: isProductsLoading } = useCartProducts();

        return {
          addProduct: execute,
          isProductAdding,
          isProductsLoading,
          products: data,
        };
      },
      { wrapper: Wrapper }
    );

    await waitFor(() => {
      return expect(result.current.products).toBeDefined();
    });

    expect(result.current.products).toEqual(mockProducts);

    const getUpdatedProductsInCartSpy = vi
      .spyOn(MockFailingCartService.prototype, 'getProductsInCart')
      .mockResolvedValueOnce([...mockProducts, productToAdd]);

    await act(async () => await result.current.addProduct('test'));

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
