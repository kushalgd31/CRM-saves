import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const SettingsAppView = lazy(() => import('./components/views/SettingsAppView'));
const AccountTabView = lazy(() => import('./components/views/AccountTabView'));
const SecurityTabView = lazy(() => import('./components/views/SecurityTabView'));
const PlanBillingTabView = lazy(() => import('./components/views/PlanBillingTabView'));
const NotificationsTabView = lazy(() => import('./components/views/NotificationsTabView'));
const TeamTabView = lazy(() => import('./components/views/TeamTabView'));

/**
 * The Settings App Route.
 */
const settingsRoute: FuseRouteItemType = {
	path: 'settings',
	element: (
		<SettingsAppView>
			<Outlet />
		</SettingsAppView>
	),
	children: [
		{
			path: 'account',
			element: <AccountTabView />
		},
		{
			path: 'security',
			element: <SecurityTabView />
		},
		{
			path: 'plan-billing',
			element: <PlanBillingTabView />
		},
		{
			path: 'notifications',
			element: <NotificationsTabView />
		},
		{
			path: 'team',
			element: <TeamTabView />
		},
		{
			path: '',
			element: <Navigate to="account" />
		}
	]
};

const legacySettingsRoute: FuseRouteItemType = {
	...settingsRoute,
	path: 'apps/settings'
};

export default [settingsRoute, legacySettingsRoute];
