import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const WithdrawDashboardAppView = lazy(() => import('./components/views/WithdrawDashboardAppView'));

const route: FuseRouteItemType = {
	path: 'dashboards/withdraw',
	element: <WithdrawDashboardAppView />
};

export default route;
