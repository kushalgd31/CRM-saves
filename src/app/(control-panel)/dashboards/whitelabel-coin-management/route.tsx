import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const WhitelabelCoinManagementView = lazy(() => import('./components/views/WhitelabelCoinManagementView'));

const route: FuseRouteItemType = {
	path: 'dashboards/whitelabel-coin-management',
	element: <WhitelabelCoinManagementView />
};

export default route;
