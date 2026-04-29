/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { defaultReportSlug } from './config/reportConfig';

const BaseReportView = lazy(() => import('./view/Basereport'));

const route: FuseRouteItemType = {
	path: 'reports',
	element: <Outlet />,
	children: [
		{
			path: '',
			element: <Navigate to={defaultReportSlug} />
		},
		{
			path: ':reportKey',
			element: <BaseReportView />
		}
	]
};

export default route;
