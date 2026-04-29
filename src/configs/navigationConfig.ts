import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import person from '@mui/icons-material/Person';

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
						id: 'dashboards.transactions',
						title: 'Transactions',
						type: 'item',
						icon: 'lucide:list',
						url: '/dashboards/transactions'
					}
					
				
		]
	},
	{
		id: 'players',
		title: 'Players',
		subtitle: 'Manage your players',
		type: 'group',
		icon: 'lucide:feed',
		translate: 'Players',
		children: [
			{
				id: 'dashboards.kyc',
				title: 'Players KYC',
				type: 'item',
				icon: 'lucide:badge-check',
				url: '/dashboards/kyc'
			},
		]
	},
	
	{
		id: 'finance',
		title: 'Finance',
		subtitle: 'Manage all finance here',
		type: 'group',
		icon: 'lucide:feed',
		translate: 'Finance',
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
		]
	},
	{
		id: 'roles',
		title: 'Role Management',
		subtitle: 'Create roles, define permissions',
		type: 'group',
		icon: 'lucide:feed',
		translate: 'Roles',
		children: [
			{
						id: 'dashboards.sales',
						title: 'Sales',
						type: 'item',
						icon: 'lucide:trending-up',
						url: '/dashboards/sales'
					},
		]},
		{
		id: 'Bonus Management',
		title: 'Report',
		subtitle: 'Create Bonus, view history',
		type: 'group',
		icon: 'lucide:feed',
		translate: 'Bonus',
		children: [
			{
				id: 'dashboards.project',
				title: 'Dashboard',
				type: 'item',
				icon: 'lucide:clipboard-check',
				url: '/dashboards/project'
			},
		]
		},
	{
		id: 'reports',
		title: 'Report',
		subtitle: 'Start from here',
		type: 'group',
		icon: 'lucide:feed',
		translate: 'Reports',
		children: [
			{
				id: 'reports.agent-revenue',
				title: 'Agent Revenue',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/agent-revenue'
			},
			{
				id: 'reports.player-revenue',
				title: 'Player Revenue',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/player-revenue'
			},
			{
				id: 'reports.game-transaction',
				title: 'Game Transaction',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/game-transaction'
			},
			{
				id: 'reports.player',
				title: 'Player',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/player'
			},
			{
				id: 'reports.unified-transaction',
				title: 'Unified Transaction',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/unified-transaction'
			},
			{
				id: 'reports.player-financial',
				title: 'Player Financial',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/player-financial'
			},
			{
				id: 'reports.player-bonus',
				title: 'Player Bonus',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/player-bonus'
			},
			{
				id: 'reports.bet',
				title: 'Bet',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/reports/bet'
			}
		]
	},
	{
		id: 'others',
		title: 'Others',
		subtitle: 'Other options',
		type: 'group',
		icon: 'lucide:feed',
		translate: 'Others',
		children: [
			{
				id: 'dashboards.settings',
				title: 'Settings',
				type: 'item',
				icon: 'lucide:settings',
				url: '/settings'
			},
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				icon: 'person',
				url: '/apps/profile'
			},
		]
		}
];

export default navigationConfig;
