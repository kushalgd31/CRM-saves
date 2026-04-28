import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const TransactionsDashboardAppView = lazy(() => import('./components/views/TransactionsDashboardAppView'));

/**
 * Transactions Dashboard App Route
 */
const route: FuseRouteItemType = {
	path: 'dashboards/transactions',
	element: <TransactionsDashboardAppView />
};

export default route;
