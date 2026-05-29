import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const PlayerCommissionDashboardAppView = lazy(() => import('./components/views/PlayerCommissionDashboardAppView'));

const route: FuseRouteItemType = {
	path: 'dashboards/player-commission',
	element: <PlayerCommissionDashboardAppView />
};

export default route;
