import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const AgentCoinManagementView = lazy(() => import('./components/views/AgentCoinManagementView'));

const route: FuseRouteItemType = {
	path: 'dashboards/agent-coin-management',
	element: <AgentCoinManagementView />
};

export default route;
