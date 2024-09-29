export class Product {
    constructor(public id: number, public title: string) {}
}

export interface ICartService {
    getProductsInCart(): Promise<Readonly<Product[]>>;
    addProductToCart(title: string): Promise<Readonly<Product>>;
}

export class MockFailingCartService implements ICartService {
    private productId = 0;
    private shouldFail = true;
    private readonly productsInCart: Product[] = [];

    public async getProductsInCart(): Promise<Readonly<Product[]>> {
        await this.wait(1000);
        this.maybeFail();
        console.info('Cart action success');
        return [...this.productsInCart];
    }

    public async addProductToCart(title: string): Promise<Readonly<Product>> {
        await this.wait(1500);
        this.maybeFail();
        const product = { id: this.generateId(), title };

        this.productsInCart.push(product);
        console.info('Cart action success');
        return product;
    }

    private generateId() {
        return this.productId++;
    }

    private wait(time: number = 1000): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }

    private maybeFail() {
        if (this.shouldFail) {
            this.shouldFail = false;
            console.error('Cart action failed');
            throw new Error('Cart action failed');
        } else {
            this.shouldFail = true;
        }
    }
}
