import { ICartService, MockFailingCartService } from './cart-service';

const cartService: ICartService = new MockFailingCartService();

export const api = () => {
    return {
        cart: cartService,
    };
};
