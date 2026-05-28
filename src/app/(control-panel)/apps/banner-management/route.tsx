import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const BannerManagementAppView = lazy(() => import('./components/view/BannerManagementAppView'));

const route: FuseRouteItemType = {
	path: 'apps/banner-management',
	element: <BannerManagementAppView />
};

export default route;
