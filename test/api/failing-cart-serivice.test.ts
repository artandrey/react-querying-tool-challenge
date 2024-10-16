import {
  ICartService,
  MockFailingCartService,
} from '../../src/shared/api/cart-service';

describe('MockFailingCartService', () => {
  let cartService: ICartService;

  beforeEach(() => {
    cartService = new MockFailingCartService();
  });

  test('should be defined', () => {
    expect(cartService).toBeDefined();
  });

  test('should fail to get products in cart on first try', () => {
    expect(() => cartService.getProductsInCart()).rejects.toThrow();
  });

  test('should return products in cart on second try', async () => {
    await expect(() => cartService.getProductsInCart()).rejects.toThrow();
    await expect(cartService.getProductsInCart()).resolves.toEqual([]);
  });

  test('should fail to add product on first try', () => {
    expect(() => cartService.addProductToCart('Product A')).rejects.toThrow();
  });

  test('should add product on second try', async () => {
    await expect(() =>
      cartService.addProductToCart('Product A')
    ).rejects.toThrow();
    await expect(cartService.addProductToCart('Product A')).resolves.toEqual(
      expect.objectContaining({ title: 'Product A' })
    );
  });

  test('should fail to get available products on first try', () => {
    expect(() => cartService.getAvailableProducts()).rejects.toThrow();
  });

  test('should return available products on second try', async () => {
    await expect(() => cartService.getAvailableProducts()).rejects.toThrow();
    const products = await cartService.getAvailableProducts();
    expect(products).toHaveLength(3);
    expect(products[0].title).toBe('Product A');
    expect(products[1].title).toBe('Product B');
    expect(products[2].title).toBe('Product C');
  });

  test('should remove product from available products when added to cart', async () => {
    await expect(cartService.getAvailableProducts()).rejects.toThrow();
    await expect(cartService.addProductToCart('Product A')).resolves.toEqual(
      expect.objectContaining({ title: 'Product A' })
    );
    await expect(() => cartService.getAvailableProducts()).rejects.toThrow();

    const availableProducts = await cartService.getAvailableProducts();
    expect(availableProducts).toHaveLength(2);
    expect(
      availableProducts.find((p) => p.title === 'Product A')
    ).toBeUndefined();
  });

  test('should replenish product after being added to cart', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    await expect(cartService.getAvailableProducts()).rejects.toThrow();
    const initialProducts = await cartService.getAvailableProducts();
    expect(initialProducts).toHaveLength(3);
    await expect(cartService.addProductToCart('Product A')).rejects.toThrow();
    await cartService.addProductToCart('Product A');
    await expect(cartService.getAvailableProducts()).rejects.toThrow();
    let availableProducts = await cartService.getAvailableProducts();
    expect(availableProducts).toHaveLength(2);

    await expect(cartService.getAvailableProducts()).rejects.toThrow();

    await vi.advanceTimersByTimeAsync(3000);

    availableProducts = await cartService.getAvailableProducts();

    expect(availableProducts).toHaveLength(3);

    const replenishedProduct = availableProducts.find(
      (p) => p.title === 'Product A'
    );
    expect(replenishedProduct).toBeDefined();
    expect(replenishedProduct?.id).not.toBe(0);
  });
});
