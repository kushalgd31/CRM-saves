import { http, HttpResponse } from 'msw';

const playerCommissionSummary = [
	{
		id: 'Loosing Bonus',
		title: 'Loosing Bonus',
		value: 50000,
		rate: 2.5,
		time: 'Apr 13 - Apr 19'
	},
	{
		id: 'Loosing Bonus',
		title: 'Loosing Bonus',
		value: 100000,
		rate: 5,
		time: 'Apr 13 - Apr 19'
	},
	{
		id: 'Loosing Bonus',
		title: 'Loosing Bonus',
		value: 200000,
		rate: 10,
		time: 'Apr 13 - Apr 19'
	},
	{
		id: 'processed',
		title: 'Approved Live Casino',
		value: '40,218',
		time: '112 Users Processed'
	},
	{
		id: 'Pending',
		title: 'Pending',
		value: '40,218',
		time: '12 Users Pending'
	}
] as const;

const playerCommissionRows = [
	{
		id: 'pc-1',
		name: 'Rahul Sharma',
		email: 'rahul.sharma@example.com',
		phone: '+91 98765 43210',
		sportsbook: 'pending',
		casino: 'approved',
		slots: 'pending',
		liveCasino: 'approved',
		overallStatus: 'pending',
		date: '2026-04-28',
		time: '10:30:00',
		sportsbookImages: ['./assets/images/demo-content/Frame 454.svg'],
		casinoImages: [
			'./assets/images/demo-content/Frame 454.svg',
			'./assets/images/demo-content/Frame 454.svg'
		],
		slotsImages: ['./assets/images/demo-content/Frame 454.svg'],
		liveCasinoImages: ['./assets/images/demo-content/Frame 454.svg']
	},
	{
		id: 'pc-2',
		name: 'Priya Patel',
		email: 'priya.patel@example.com',
		phone: '+91 98765 43211',
		sportsbook: 'approved',
		casino: 'approved',
		slots: 'approved',
		liveCasino: 'approved',
		overallStatus: 'approved',
		date: '2026-04-29',
		time: '14:45:00',
		sportsbookImages: ['./assets/images/demo-content/Frame 454.svg'],
		casinoImages: [
			'./assets/images/demo-content/Frame 454.svg',
			'./assets/images/demo-content/Frame 454.svg'
		],
		slotsImages: ['./assets/images/demo-content/Frame 454.svg'],
		liveCasinoImages: ['./assets/images/demo-content/Frame 454.svg']
	},
	{
		id: 'pc-3',
		name: 'Amit Kumar',
		email: 'amit.kumar@example.com',
		phone: '+91 98765 43212',
		sportsbook: 'approved',
		casino: 'rejected',
		slots: 'pending',
		liveCasino: 'pending',
		overallStatus: 'rejected',
		date: '2026-04-30',
		time: '09:15:00',
		sportsbookImages: ['./assets/images/demo-content/Frame 454.svg'],
		casinoImages: [
			'./assets/images/demo-content/Frame 454.svg',
			'./assets/images/demo-content/Frame 454.svg'
		],
		slotsImages: ['./assets/images/demo-content/Frame 454.svg'],
		liveCasinoImages: ['./assets/images/demo-content/Frame 454.svg']
	},
	{
		id: 'pc-4',
		name: 'Sneha Verma',
		email: 'sneha.verma@example.com',
		phone: '+91 98765 43213',
		sportsbook: 'pending',
		casino: 'pending',
		slots: 'approved',
		liveCasino: 'approved',
		overallStatus: 'pending',
		date: '2026-04-30',
		time: '12:20:00',
		sportsbookImages: ['./assets/images/demo-content/Frame 454.svg'],
		casinoImages: ['./assets/images/demo-content/Frame 454.svg'],
		slotsImages: ['./assets/images/demo-content/Frame 454.svg'],
		liveCasinoImages: ['./assets/images/demo-content/Frame 454.svg']
	}
] as const;

const playerCommissionDashboardApi = [
	http.get('/api/mock/player-commission/summary', async () => {
		return HttpResponse.json(playerCommissionSummary);
	}),
	http.get('/api/mock/player-commission/rows', async () => {
		return HttpResponse.json(playerCommissionRows);
	})
];

export default playerCommissionDashboardApi;
