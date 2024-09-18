import { withQueryProvider } from './with-query-provider';
import compose from 'compose-function';

export const withProviders = compose(withQueryProvider);
