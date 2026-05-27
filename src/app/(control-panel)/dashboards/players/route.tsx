import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const PlayersDashboardAppView = lazy(() => import('./components/views/PlayersDashboardAppView'));

const route: FuseRouteItemType = {
	path: 'dashboards/players',
	element: <PlayersDashboardAppView />
};

export default route;
