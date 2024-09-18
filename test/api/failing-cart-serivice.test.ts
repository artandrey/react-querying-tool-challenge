import { MockFailingCartService } from '../../src/shared/api/cart-service';

describe('MockFailingCartService service', () => {
    test('should be defined', () => {
        const cartService = new MockFailingCartService();
        expect(cartService).toBeDefined();
    });

    test('should fail give products on first try', () => {
        const cartService = new MockFailingCartService();
        expect(() => cartService.getProductsInCart()).rejects.toThrow();
    });

    test('should return products on second try', async () => {
        const cartService = new MockFailingCartService();
        await expect(() => cartService.getProductsInCart()).rejects.toThrow();

        await expect(cartService.getProductsInCart()).resolves.toStrictEqual(
            []
        );
    });
});
