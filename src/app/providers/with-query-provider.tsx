import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

export const withQueryProvider =
    <P extends object>(Component: React.ComponentType<P>) =>
    (props: P) => {
        return (
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        );
    };
