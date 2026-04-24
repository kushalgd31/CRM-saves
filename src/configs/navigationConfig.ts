import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	// ─────────────────────────────────────────────
	// DASHBOARDS GROUP  (Dashboard, KYC, Settings + Category with Withdraw, Deposit, Academy)
	// ─────────────────────────────────────────────
	{
		id: 'dashboards',
		title: 'Dashboards',
		subtitle: 'Start from here',
		type: 'group',
		icon: 'lucide:layout-dashboard',
		translate: 'DASHBOARDS',
		children: [
			{
				id: 'dashboards.project',
				title: 'Dashboard',
				type: 'item',
				icon: 'lucide:clipboard-check',
				url: '/dashboards/project'
			},
			{
				id: 'dashboards.settings',
				title: 'Settings',
				type: 'item',
				icon: 'lucide:settings',
				url: '/apps/settings'
			},
			{
				id: 'dashboards.profile',
				title: 'Profile',
				type: 'item',
				icon: 'lucide:user-circle-2',
				url: '/apps/profile'
			},
			{
				id: 'dashboards.kyc',
				title: 'KYC',
				type: 'item',
				icon: 'lucide:badge-check',
				url: '/dashboards/kyc'
			},
			{
				id: 'dashboards.category',
				title: 'Category',
				type: 'group',
				children: [
					{
						id: 'dashboards.withdraw',
						title: 'Withdraw',
						type: 'item',
						icon: 'lucide:arrow-down-to-line',
						url: '/dashboards/withdraw'
					},
					{
						id: 'dashboards.deposit',
						title: 'Deposit',
						type: 'item',
						icon: 'lucide:wallet',
						url: '/dashboards/deposit'
					},
					{
						id: 'dashboards.academy',
						title: 'Academy',
						type: 'item',
						icon: 'lucide:graduation-cap',
						url: '/apps/academy/courses'
					}
				]
			}
		]
	}
];

export default navigationConfig;
