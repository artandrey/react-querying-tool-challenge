import React from 'react';
import { useCartProducts } from '../../../../feat/get-cart';

export const CartView: React.FC = () => {
    const { data: cartProducts, isLoading } = useCartProducts();

    if (isLoading) {
        return <div className="text-white">Loading cart...</div>;
    }

    return (
        <div className="text-white h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cartProducts?.length ? (
                <ul className="space-y-4">
                    {cartProducts.map((product) => (
                        <li
                            key={product.id}
                            className="text-4xl"
                        >
                            {product.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Your cart is empty</div>
            )}
        </div>
    );
};
