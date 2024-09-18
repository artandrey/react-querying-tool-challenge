import { MockFailingCartService } from '../../src/shared/api/cart-service';

describe('MockFailingCartService service', () => {
    test('should be defined', () => {
        const cartService = new MockFailingCartService();
        expect(cartService).toBeDefined();
    });
});
