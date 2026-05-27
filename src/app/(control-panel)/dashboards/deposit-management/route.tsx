import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const DepositManagementView = lazy(() => import('./components/views/DepositManagementView'));

const route: FuseRouteItemType = {
	path: 'dashboards/deposit-management',
	element: <DepositManagementView />
};

export default route;
