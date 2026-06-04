import { FuseRouteItemType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import { Navigate } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import ErrorBoundary from '@fuse/utils/ErrorBoundary';
import { layoutConfigOnlyMain } from './layoutConfigTemplates';
import settingsConfig from './settingsConfig';
import App from '@/app/App';
import authRoute from '@/app/(public)/(auth)/route';
import publicErrorRoute from '@/app/(public)/(errors)/route';
import twoFactorRoute from '@/app/(control-panel)/pages/2FA/route';
import whitelabelRoute from '@/app/(control-panel)/apps/whitelabel/route';

const mainRoutes: FuseRouteItemType[] = [authRoute, publicErrorRoute, whitelabelRoute, twoFactorRoute];

const routes: FuseRoutesType = [
	{
		path: '/',
		element: <App />,
		auth: settingsConfig.defaultAuth,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: '/',
				element: <Navigate to="/apps/whitelabel" />
			},
			...mainRoutes,
			{
				path: 'loading',
				element: <FuseLoading />,
				settings: { layout: layoutConfigOnlyMain }
			}
		]
	},
	{
		path: '*',
		element: <Navigate to="/404" />
	}
];

export default routes;
