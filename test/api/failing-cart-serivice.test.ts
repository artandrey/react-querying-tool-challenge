import {
    ICartService,
    MockFailingCartService,
} from '../../src/shared/api/cart-service';

describe('MockFailingCartService service', () => {
    let cartService: ICartService;

    beforeEach(() => {
        cartService = new MockFailingCartService();
    });

    test('should be defined', () => {
        expect(cartService).toBeDefined();
    });

    test('should fail give products on first try', () => {
        expect(() => cartService.getProductsInCart()).rejects.toThrow();
    });

    test('should return products on second try', async () => {
        await expect(() => cartService.getProductsInCart()).rejects.toThrow();

        await expect(cartService.getProductsInCart()).resolves.toStrictEqual(
            []
        );
    });

    test('should fail to add product on first try', () => {
        expect(() => cartService.addProductToCart('test')).rejects.toThrow();
    });

    test('should add product on second try', async () => {
        await expect(() =>
            cartService.addProductToCart('test')
        ).rejects.toThrow();

        await expect(cartService.addProductToCart('test')).resolves.toEqual(
            expect.objectContaining({ title: 'test' })
        );
    });
});
