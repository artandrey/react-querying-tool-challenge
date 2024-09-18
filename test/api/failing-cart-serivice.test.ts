import { MockFailingCartService } from '../../src/shared/api/cart-service';

describe('MockFailingCartService service', () => {
    test('should be defined', () => {
        const cartService = new MockFailingCartService();
        expect(cartService).toBeDefined();
    });

    test('should fail getProductsInCart on first try', () => {
        const cartService = new MockFailingCartService();
        expect(() => cartService.getProductsInCart()).rejects.toThrow();
    });
});
