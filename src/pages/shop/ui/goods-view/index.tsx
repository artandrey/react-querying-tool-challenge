import React from 'react';
import classNames from 'classnames';
import { useAddProduct } from '../../../../feat/add-product';
import { useCartProducts } from '../../../../feat/get-cart';
import { Product } from '../../../../shared/api/cart-service';

const products: Product[] = [
    { id: 1, title: '🍎' },
    { id: 2, title: '🍌' },
    { id: 3, title: '🍇' },
    { id: 4, title: '🍉' },
    { id: 5, title: '🍓' },
    { id: 6, title: '🍒' },
    { id: 7, title: '🥭' },
    { id: 8, title: '🍍' },
    { id: 9, title: '🍑' },
    { id: 10, title: '🍋' },
    { id: 11, title: '🍊' },
    { id: 12, title: '🍏' },
    { id: 13, title: '🍈' },
    { id: 14, title: '🥝' },
    { id: 15, title: '🍆' },
    { id: 16, title: '🥕' },
    { id: 17, title: '🥑' },
    { id: 18, title: '🍔' },
    { id: 19, title: '🍕' },
    { id: 20, title: '🍟' },
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
