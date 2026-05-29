import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const WithdrawalManagementView = lazy(() => import('./components/views/WithdrawalManagementView'));

const route: FuseRouteItemType = {
	path: 'dashboards/withdrawal-management',
	element: <WithdrawalManagementView />
};

export default route;
