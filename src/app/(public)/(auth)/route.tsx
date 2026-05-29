import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import authRoles from '@auth/authRoles';
import SignInPageView from './components/views/SignInPageView';
import SignUpPageView from './components/views/SignUpPageView';
import SignOutPageView from './components/views/SignOutPageView';
import Otp from './components/views/Otp';

const route: FuseRouteItemType = {
	children: [
		{
			path: 'sign-in',
			element: <SignInPageView />,
			settings: {
				layout: {
					config: {
						navbar: {
							display: false
						},
						toolbar: {
							display: false
						},
						footer: {
							display: false
						},
						leftSidePanel: {
							display: false
						},
						rightSidePanel: {
							display: false
						}
					}
				}
			},
			auth: authRoles.onlyGuest // []
		},
		{
			path: 'otp',
			element: <Otp />,
			settings: {
				layout: {
					config: {
						navbar: {
							display: false
						},
						toolbar: {
							display: false
						},
						footer: {
							display: false
						},
						leftSidePanel: {
							display: false
						},
						rightSidePanel: {
							display: false
						}
					}
				}
			},
			auth: null
		},
		{
			path: 'sign-up',
			element: <SignUpPageView />,
			settings: {
				layout: {
					config: {
						navbar: {
							display: false
						},
						toolbar: {
							display: false
						},
						footer: {
							display: false
						},
						leftSidePanel: {
							display: false
						},
						rightSidePanel: {
							display: false
						}
					}
				}
			},
			auth: authRoles.onlyGuest
		},
		{
			path: 'sign-out',
			element: <SignOutPageView />,
			settings: {
				layout: {
					config: {
						navbar: {
							display: false
						},
						toolbar: {
							display: false
						},
						footer: {
							display: false
						},
						leftSidePanel: {
							display: false
						},
						rightSidePanel: {
							display: false
						}
					}
				}
			},
			auth: null
		}
	]
};

export default route;
