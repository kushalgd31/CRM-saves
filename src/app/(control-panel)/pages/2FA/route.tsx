import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { lazy } from 'react';

const FAHeaderPageView = lazy(() => import('./FAview'));

const route: FuseRouteItemType = {
  path: 'others/2FA',
  element: <FAHeaderPageView />
};

export default route;
