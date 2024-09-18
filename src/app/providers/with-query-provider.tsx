export const withQueryProvider = (Component: React.ComponentType) => () => {
    // wrap your app into query provider
    return (
        <>
            <Component />
        </>
    );
};
