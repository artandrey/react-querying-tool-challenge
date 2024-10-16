import React from 'react';
import classNames from 'classnames';
import { useAddProduct } from '../../../../feat/add-product';
import { useCartProducts } from '../../../../feat/get-cart';
import { useAvailableProducts } from '../../../../feat/get-available-products/lib/hooks/use-available-products';
import { Product } from '../../../../shared/api/cart-service';

export const GoodsView: React.FC = () => {
  const { data: availableProducts, isLoading: isProductsLoading } =
    useAvailableProducts();

  const { execute, isLoading: isAddingProduct } = useAddProduct();
  const { data: cartProducts, isLoading: isCartLoading } = useCartProducts();

  const isProductInCart = (id: number) => {
    return cartProducts?.some((product) => product.id === id);
  };

  const handleProductClick = (product: Product) => {
    if (!isProductInCart(product.id) && !isAddingProduct && !isCartLoading) {
      execute(product.title);
    }
  };

  if (isProductsLoading) {
    return (
      <div className="text-center text-2xl text-white">Loading products...</div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {availableProducts?.map((product) => {
        const isInCart = isProductInCart(product.id);
        const isDisabled = isInCart || isAddingProduct || isCartLoading;

        return (
          <div
            key={product.id}
            onClick={() => !isDisabled && handleProductClick(product)}
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
