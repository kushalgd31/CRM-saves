import { ProductOption, WhitelabelMetric, WhitelabelSite } from '../types';

export const productOptions: ProductOption[] = [
	{ id: 'casino', name: 'Casino', icon: '🎰' },
	{ id: 'sports', name: 'Sports', icon: '⚽' },
	{ id: 'matka', name: 'Matka', icon: '🎲' },
	{ id: 'conversation', name: 'Conversation', icon: '💬' },
	{ id: 'poker', name: 'Poker', icon: '🃏' },
	{ id: 'lottery', name: 'Lottery', icon: '🎟️' }
];

export const whitelabelMetrics: WhitelabelMetric[] = [
	{ title: 'Total Whitelabels', value: 5, label: 'Total Whitelabels', color: 'inherit' },
	{ title: 'Active Sites', value: 3, label: 'Active Sites', color: 'success' },
	{ title: 'Total Players', value: '47,819', label: 'Total Players', color: 'primary' },
	{ title: 'Active Players', value: '10,356', label: 'Active Players', color: 'secondary' }
];

export const whitelabelRows: WhitelabelSite[] = [
	{
		id: '1',
		name: 'BetMaster Pro',
		spoc: 'John Doe',
		support: 'support@betmaster.com',
		domain: 'betmaster.com',
		appId: 'WL-BMP-2024-A1B2C3',
		products: ['Casino', 'Sports', 'Matka'],
		totalPlayers: '12,543',
		activePlayers: '3,421',
		bets: '8,934',
		deposits: '₹45,23,450',
		withdrawals: '₹23,12,300',
		revenue: '₹22,11,150',
		lastDate: '2024-05-24',
		lastTime: '15:30:00',
		created: '2024-01-15',
		status: 'Active'
	},
	{
		id: '2',
		name: 'WinZone Gaming',
		spoc: 'Sarah Miller',
		support: 'help@winzone.io',
		domain: 'winzone.io',
		appId: 'WL-WZG-2024-D4E5F6',
		products: ['Casino', 'Sports', 'Conversation'],
		totalPlayers: '8,721',
		activePlayers: '2,134',
		bets: '5,623',
		deposits: '₹28,45,200',
		withdrawals: '₹15,67,800',
		revenue: '₹12,77,400',
		lastDate: '2024-05-24',
		lastTime: '14:45:00',
		created: '2024-02-20',
		status: 'Active'
	},
	{
		id: '3',
		name: 'Lucky7 Casino',
		spoc: 'Mike Johnson',
		support: 'support@lucky7.bet',
		domain: 'lucky7.bet',
		appId: 'WL-L7C-2024-G7H8I9',
		products: ['Casino', 'Matka'],
		totalPlayers: '4,532',
		activePlayers: '234',
		bets: '892',
		deposits: '₹5,43,100',
		withdrawals: '₹3,21,400',
		revenue: '₹2,21,700',
		lastDate: '2024-05-20',
		lastTime: '10:15:00',
		created: '2024-03-10',
		status: 'Inactive'
	},
	{
		id: '4',
		name: 'SportsPro Hub',
		spoc: 'Emma Davis',
		support: 'contact@sportspro.com',
		domain: 'sportspro.com',
		appId: 'WL-SPH-2024-J1K2L3',
		products: ['Sports', 'Conversation'],
		totalPlayers: '15,234',
		activePlayers: '4,567',
		bets: '12,456',
		deposits: '₹67,89,300',
		withdrawals: '₹34,56,200',
		revenue: '₹33,33,100',
		lastDate: '2024-05-24',
		lastTime: '16:20:00',
		created: '2024-04-05',
		status: 'Active'
	}
];
