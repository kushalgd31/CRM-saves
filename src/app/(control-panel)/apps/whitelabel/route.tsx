import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const WhitelabelManagementView = lazy(() => import('./components/views/WhitelabelManagementView'));

const route: FuseRouteItemType = {
	path: 'apps/whitelabel',
	element: <WhitelabelManagementView />
};

export default route;
