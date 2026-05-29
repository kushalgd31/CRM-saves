import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const RegistrationConfigAppView = lazy(() => import('./components/view/RegistrationConfigAppView'));

/**
 * The Registration Config app route.
 */
const route: FuseRouteItemType = {
	path: 'apps/registration-config',
	element: <RegistrationConfigAppView />
};

export default route;
