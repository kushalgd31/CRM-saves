import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const KycDashboardAppView = lazy(() => import('./components/views/KycDashboardAppView'));

const route: FuseRouteItemType = {
	path: 'dashboards/kyc',
	element: <KycDashboardAppView />
};

export default route;
