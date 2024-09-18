import React from 'react';

export const withQueryProvider =
    <P extends object>(Component: React.ComponentType<P>) =>
    ({ ...props }: P) => {
        // wrap your app into query provider
        return (
            <>
                <Component {...props} />
            </>
        );
    };
