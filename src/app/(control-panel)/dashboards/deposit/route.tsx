import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const DepositDashboardAppView = lazy(() => import('./components/views/DepositDashboardAppView'));

/**
 * Deposit Dashboard App Route
 */
const route: FuseRouteItemType = {
	path: 'dashboards/deposit',
	element: <DepositDashboardAppView />
};

export default route;
