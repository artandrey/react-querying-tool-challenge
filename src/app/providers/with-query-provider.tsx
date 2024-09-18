import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export const withQueryProvider =
    <P extends object>(Component: React.ComponentType<P>) =>
    ({ ...props }: P) => {
        return (
            <QueryClientProvider client={queryClient}>
                <Component {...props} />
            </QueryClientProvider>
        );
    };
