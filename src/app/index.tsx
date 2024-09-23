import { withProviders } from './providers';
import './index.css';
import { StorePage } from '../pages/shop';

const App = () => {
    return (
        <>
            <StorePage />
        </>
    );
};

export const WrappedApp = withProviders(App);
