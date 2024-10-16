export class Product {
  constructor(public id: number, public title: string) {}
}

export interface ICartService {
  getProductsInCart(): Promise<Readonly<Product[]>>;
  addProductToCart(title: string): Promise<Readonly<Product>>;
  getAvailableProducts(): Promise<Readonly<Product[]>>;
}

export class MockFailingCartService implements ICartService {
  private productId = 0;
  private shouldFail = true;
  private readonly productsInCart: Product[] = [];
  private availableProducts: Product[] = [
    new Product(this.generateId(), 'Product A'),
    new Product(this.generateId(), 'Product B'),
    new Product(this.generateId(), 'Product C'),
  ];

  public async getProductsInCart(): Promise<Readonly<Product[]>> {
    await this.wait(400);
    this.maybeFail();
    return this.productsInCart;
  }

  public async addProductToCart(title: string): Promise<Readonly<Product>> {
    await this.wait(200);
    this.maybeFail();
    const productIndex = this.availableProducts.findIndex(
      (p) => p.title === title
    );
    if (productIndex === -1) {
      throw new Error('Product not available');
    }
    const product = this.availableProducts.splice(productIndex, 1)[0];
    this.productsInCart.push(product);
    this.scheduleProductReplenishment(title);
    return product;
  }

  public async getAvailableProducts(): Promise<Readonly<Product[]>> {
    await this.wait(300);
    this.maybeFail();
    return this.availableProducts;
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

  private scheduleProductReplenishment(title: string) {
    setTimeout(() => {
      this.availableProducts.push(new Product(this.generateId(), title));
    }, 3000);
  }
}
