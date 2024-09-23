import React from 'react';
import classNames from 'classnames';
import { useAddProduct } from '../../../../feat/add-product';
import { useCartProducts } from '../../../../feat/get-cart';
import { Product } from '../../../../shared/api/cart-service';

const products: Product[] = [
    new Product(1, '🍎'),
    new Product(2, '🍌'),
    new Product(3, '🍇'),
    new Product(4, '🍉'),
    new Product(5, '🍓'),
    new Product(6, '🍒'),
    new Product(7, '🥭'),
    new Product(8, '🍍'),
    new Product(9, '🍑'),
    new Product(10, '🍋'),
    new Product(11, '🍊'),
    new Product(12, '🍏'),
    new Product(13, '🍈'),
    new Product(14, '🥝'),
    new Product(15, '🍆'),
    new Product(16, '🥕'),
    new Product(17, '🥑'),
    new Product(18, '🍔'),
    new Product(19, '🍕'),
    new Product(20, '🍟'),
];

export const GoodsView: React.FC = () => {
    const { execute, isLoading: isAddingProduct } = useAddProduct();
    const { data: cartProducts, isLoading: isCartLoading } = useCartProducts();

    const isProductInCart = (title: string) => {
        return cartProducts?.some((product) => product.title === title);
    };

    const handleProductClick = (title: string) => {
        if (!isProductInCart(title) && !isAddingProduct && !isCartLoading) {
            execute(title);
        }
    };

    return (
        <div className="grid grid-cols-5 gap-4">
            {products.map((product) => {
                const isInCart = isProductInCart(product.title);
                const isDisabled = isInCart || isAddingProduct || isCartLoading;

                return (
                    <div
                        key={product.id}
                        onClick={() =>
                            !isDisabled && handleProductClick(product.title)
                        }
                        className={classNames(
                            'p-4 text-4xl cursor-pointer border-b-2 border-orange-900 transition-transform duration-200',
                            {
                                'saturate-0 cursor-not-allowed': isDisabled,
                                'hover:animate-wiggle': !isDisabled,
                            }
                        )}
                    >
                        {product.title}
                    </div>
                );
            })}
        </div>
    );
};
