import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const BonusAppView = lazy(() => import('./components/view/BonusAppView'));

/**
 * The Bonus app route.
 */
const route: FuseRouteItemType = {
	path: 'apps/bonus',
	element: <BonusAppView />
};

export default route;
