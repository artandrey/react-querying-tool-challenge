import React from 'react';
import { CartView } from './cart-view';
import { GoodsView } from './goods-view';

export const StorePage: React.FC = () => {
    return (
        <div className="bg-wood bg-cover flex m-auto  h-screen">
            <div className="w-1/2 border-r-2 border-orange-900 p-4">
                <GoodsView />
            </div>
            <div className="w-1/2 p-4">
                <CartView />
            </div>
        </div>
    );
};
