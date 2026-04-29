import Chip from '@mui/material/Chip';
import { type MRT_ColumnDef } from 'material-react-table';

type ReportRowValue = string | number | boolean | null | undefined;

export type ReportRow = {
	id: string;
} & Record<string, ReportRowValue>;

export const reportSlugs = [
	'agent-revenue',
	'player-revenue',
	'game-transaction',
	'player',
	'unified-transaction',
	'player-financial',
	'player-bonus',
	'bet'
] as const;

export type ReportSlug = (typeof reportSlugs)[number];

export type ReportConfig = {
	slug: ReportSlug;
	title: string;
	shortTitle: string;
	description: string;
	api: string;
	columns: MRT_ColumnDef<ReportRow>[];
	mockData: ReportRow[];
};

type ChipTone = 'default' | 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';

const defaultCurrency = 'USD';

function formatLabel(value: ReportRowValue) {
	if (value == null || value === '') {
		return 'N/A';
	}

	return String(value)
		.replace(/[_-]/g, ' ')
		.replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatCurrency(value: ReportRowValue, currency?: ReportRowValue) {
	if (typeof value !== 'number') {
		return value ?? 'N/A';
	}

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: typeof currency === 'string' && currency ? currency : defaultCurrency,
		maximumFractionDigits: 2
	}).format(value);
}

function formatDate(value: ReportRowValue) {
	if (typeof value !== 'string' || !value) {
		return value ?? 'N/A';
	}

	const parsedDate = new Date(value);

	if (Number.isNaN(parsedDate.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	}).format(parsedDate);
}

function getStatusTone(value: ReportRowValue): ChipTone {
	switch (String(value ?? '').toLowerCase()) {
		case 'active':
		case 'approved':
		case 'completed':
		case 'settled':
		case 'won':
			return 'success';
		case 'pending':
		case 'processing':
			return 'warning';
		case 'failed':
		case 'inactive':
		case 'lost':
		case 'rejected':
		case 'suspended':
			return 'error';
		case 'open':
		case 'in_review':
			return 'info';
		default:
			return 'default';
	}
}

function renderStatusChip(value: ReportRowValue) {
	const tone = getStatusTone(value);

	return (
		<Chip
			label={formatLabel(value)}
			size="small"
			color={tone}
			variant={tone === 'default' ? 'outlined' : 'filled'}
		/>
	);
}

function amountColumn(accessorKey: string, header: string, currencyKey = 'currency'): MRT_ColumnDef<ReportRow> {
	return {
		accessorKey,
		header,
		Cell: ({ row }) => (
			<span className="font-medium text-slate-900">
				{formatCurrency(row.original[accessorKey], row.original[currencyKey])}
			</span>
		)
	};
}

function dateColumn(accessorKey: string, header: string): MRT_ColumnDef<ReportRow> {
	return {
		accessorKey,
		header,
		Cell: ({ row }) => <span className="text-slate-600">{formatDate(row.original[accessorKey])}</span>
	};
}

function statusColumn(accessorKey = 'status', header = 'Status'): MRT_ColumnDef<ReportRow> {
	return {
		accessorKey,
		header,
		Cell: ({ row }) => renderStatusChip(row.original[accessorKey])
	};
}

const reportConfigEntries: Record<ReportSlug, ReportConfig> = {
	'agent-revenue': {
		slug: 'agent-revenue',
		title: 'Agent Revenue',
		shortTitle: 'Agent Revenue',
		description: 'Monitor turnover, commission, and settlement status across agent accounts.',
		api: '/api/reports/agent-revenue',
		columns: [
			{ accessorKey: 'agentName', header: 'Agent Name' },
			{ accessorKey: 'agenttree', header: 'Agent Tree' },
			{ accessorKey: 'bet', header: 'Bet' },
			{ accessorKey: 'win', header: 'Win' },
			{ accessorKey: 'ggr', header: 'GGR' },
			{ accessorKey: 'bonus', header: 'Bonus' },
			{ accessorKey: 'ngr', header: 'NGR' },
			{ accessorKey: 'mycomission', header: 'My Comission' },
			{ accessorKey: 'myrevenue', header: 'My Revenue' },
			{ accessorKey: 'nodeposits', header: 'No. Of Deposits' },
			{ accessorKey: 'totaldeposit', header: 'Total Deposit' },
			{ accessorKey: 'nowithdraw', header: 'No. Of Withdrawals' },
			{ accessorKey: 'totalwithdraw', header: 'Total Withdrawals' },
			{ accessorKey: 'registeration', header: 'Registration' },
		],
		mockData: [
			{
				id: 'AR-1001',
				agentName: 'Rohan Malhotra',
				downlineCount: 42,
				turnover: 186420,
				netRevenue: 24580,
				commissionRate: '12%',
				commissionEarned: 2949.6,
				settlementDate: '2026-04-26T13:15:00Z',
				currency: 'USD',
				status: 'completed'
			},
			{
				id: 'AR-1002',
				agentName: 'Nina Patel',
				downlineCount: 27,
				turnover: 119300,
				netRevenue: 18110,
				commissionRate: '10%',
				commissionEarned: 1811,
				settlementDate: '2026-04-27T11:00:00Z',
				currency: 'USD',
				status: 'pending'
			},
			{
				id: 'AR-1003',
				agentName: 'Yusuf Khan',
				downlineCount: 15,
				turnover: 84220,
				netRevenue: 9320,
				commissionRate: '8%',
				commissionEarned: 745.6,
				settlementDate: '2026-04-28T15:45:00Z',
				currency: 'USD',
				status: 'completed'
			}
		]
	},
	'player-revenue': {
		slug: 'player-revenue',
		title: 'Player Revenue',
		shortTitle: 'Player Revenue',
		description: 'Track stake, payout, and net revenue performance at the player level.',
		api: '/api/reports/player-revenue',
		columns: [
			{ accessorKey: 'userid', header: 'User ID' },
			{ accessorKey: 'name', header: 'Player Name' },
			{ accessorKey: 'email', header: 'Email' },
			{ accessorKey: 'registration', header: 'Registration' },
			{ accessorKey: 'agentname', header: 'Agent Name' },
			{ accessorKey: 'userid', header: 'User ID' },
			{ accessorKey: 'userid', header: 'User ID' },
		],
		mockData: [
			{
				id: 'PR-2001',
				username: 'aceplayer91',
				stake: 2450,
				payout: 1980,
				grossRevenue: 470,
				netRevenue: 428,
				product: 'Sportsbook',
				currency: 'USD',
				lastBetAt: '2026-04-28T18:10:00Z',
				status: 'active'
			},
			{
				id: 'PR-2002',
				username: 'queen7',
				stake: 5980,
				payout: 6210,
				grossRevenue: -230,
				netRevenue: -230,
				product: 'Casino',
				currency: 'USD',
				lastBetAt: '2026-04-29T05:45:00Z',
				status: 'active'
			},
			{
				id: 'PR-2003',
				username: 'highroller_v',
				stake: 11200,
				payout: 9800,
				grossRevenue: 1400,
				netRevenue: 1260,
				product: 'Live Casino',
				currency: 'USD',
				lastBetAt: '2026-04-29T08:20:00Z',
				status: 'suspended'
			}
		]
	},
	'game-transaction': {
		slug: 'game-transaction',
		title: 'Game Transaction',
		shortTitle: 'Game Transaction',
		description: 'Review round-level transactions across providers, games, and wallet activity.',
		api: '/api/reports/game-transaction',
		columns: [
			{ accessorKey: 'gameName', header: 'Game' },
			{ accessorKey: 'provider', header: 'Provider' },
			{ accessorKey: 'player', header: 'Player' },
			{ accessorKey: 'roundId', header: 'Round ID' },
			{ accessorKey: 'transactionType', header: 'Transaction Type' },
			amountColumn('amount', 'Amount'),
			amountColumn('balanceAfter', 'Balance After'),
			dateColumn('createdAt', 'Created At'),
			statusColumn()
		],
		mockData: [
			{
				id: 'GT-3001',
				gameName: 'Roulette Royale',
				provider: 'Evolution',
				player: 'aceplayer91',
				roundId: 'RD-887100',
				transactionType: 'bet',
				amount: 125,
				balanceAfter: 2410,
				currency: 'USD',
				createdAt: '2026-04-29T02:15:00Z',
				status: 'settled'
			},
			{
				id: 'GT-3002',
				gameName: 'Lucky Sevens',
				provider: 'Pragmatic Play',
				player: 'queen7',
				roundId: 'RD-887126',
				transactionType: 'win',
				amount: 320,
				balanceAfter: 6530,
				currency: 'USD',
				createdAt: '2026-04-29T02:21:00Z',
				status: 'completed'
			},
			{
				id: 'GT-3003',
				gameName: 'Dragon Tiger',
				provider: 'SA Gaming',
				player: 'highroller_v',
				roundId: 'RD-887149',
				transactionType: 'refund',
				amount: 80,
				balanceAfter: 9890,
				currency: 'USD',
				createdAt: '2026-04-29T02:35:00Z',
				status: 'pending'
			}
		]
	},
	player: {
		slug: 'player',
		title: 'Player',
		shortTitle: 'Player',
		description: 'View player profiles, balances, recent access, and lifecycle status in one place.',
		api: '/api/reports/player',
		columns: [
			{ accessorKey: 'username', header: 'Username' },
			{ accessorKey: 'fullName', header: 'Full Name' },
			{ accessorKey: 'phone', header: 'Phone' },
			{ accessorKey: 'vipLevel', header: 'VIP Level' },
			amountColumn('totalDeposit', 'Total Deposit'),
			amountColumn('currentBalance', 'Current Balance'),
			dateColumn('lastLogin', 'Last Login'),
			statusColumn()
		],
		mockData: [
			{
				id: 'PL-4001',
				username: 'aceplayer91',
				fullName: 'Aiden Cole',
				phone: '+1 202 555 0184',
				vipLevel: 'Gold',
				totalDeposit: 15400,
				currentBalance: 2410,
				currency: 'USD',
				lastLogin: '2026-04-29T06:12:00Z',
				status: 'active'
			},
			{
				id: 'PL-4002',
				username: 'queen7',
				fullName: 'Mia Sanders',
				phone: '+1 202 555 0197',
				vipLevel: 'Silver',
				totalDeposit: 8200,
				currentBalance: 6530,
				currency: 'USD',
				lastLogin: '2026-04-29T04:05:00Z',
				status: 'active'
			},
			{
				id: 'PL-4003',
				username: 'highroller_v',
				fullName: 'Victor Han',
				phone: '+1 202 555 0168',
				vipLevel: 'Platinum',
				totalDeposit: 48200,
				currentBalance: 9890,
				currency: 'USD',
				lastLogin: '2026-04-28T21:55:00Z',
				status: 'in_review'
			}
		]
	},
	'unified-transaction': {
		slug: 'unified-transaction',
		title: 'Unified Transaction',
		shortTitle: 'Unified Txn',
		description: 'Combine wallet, bonus, deposit, withdrawal, and gameplay movements into a single ledger.',
		api: '/api/reports/unified-transaction',
		columns: [
			{ accessorKey: 'reference', header: 'Reference' },
			{ accessorKey: 'username', header: 'Username' },
			{ accessorKey: 'walletType', header: 'Wallet Type' },
			{ accessorKey: 'category', header: 'Category' },
			{ accessorKey: 'direction', header: 'Direction' },
			amountColumn('amount', 'Amount'),
			amountColumn('beforeBalance', 'Before Balance'),
			amountColumn('afterBalance', 'After Balance'),
			dateColumn('createdAt', 'Created At'),
			statusColumn()
		],
		mockData: [
			{
				id: 'UT-5001',
				reference: 'TXN-208871',
				username: 'aceplayer91',
				walletType: 'Main',
				category: 'Deposit',
				direction: 'Credit',
				amount: 500,
				beforeBalance: 1910,
				afterBalance: 2410,
				currency: 'USD',
				createdAt: '2026-04-28T15:30:00Z',
				status: 'completed'
			},
			{
				id: 'UT-5002',
				reference: 'TXN-208923',
				username: 'queen7',
				walletType: 'Bonus',
				category: 'Bonus Conversion',
				direction: 'Debit',
				amount: 120,
				beforeBalance: 6650,
				afterBalance: 6530,
				currency: 'USD',
				createdAt: '2026-04-29T01:05:00Z',
				status: 'completed'
			},
			{
				id: 'UT-5003',
				reference: 'TXN-208955',
				username: 'highroller_v',
				walletType: 'Main',
				category: 'Withdrawal',
				direction: 'Debit',
				amount: 750,
				beforeBalance: 10640,
				afterBalance: 9890,
				currency: 'USD',
				createdAt: '2026-04-29T03:20:00Z',
				status: 'processing'
			}
		]
	},
	'player-financial': {
		slug: 'player-financial',
		title: 'Player Financial',
		shortTitle: 'Player Financial',
		description: 'Summarize deposits, withdrawals, bonus exposure, and player net position.',
		api: '/api/reports/player-financial',
		columns: [
			{ accessorKey: 'username', header: 'Username' },
			amountColumn('totalDeposit', 'Total Deposit'),
			amountColumn('totalWithdraw', 'Total Withdraw'),
			amountColumn('totalBonus', 'Total Bonus'),
			amountColumn('totalBet', 'Total Bet'),
			amountColumn('totalWin', 'Total Win'),
			amountColumn('netPosition', 'Net Position'),
			dateColumn('updatedAt', 'Updated At')
		],
		mockData: [
			{
				id: 'PF-6001',
				username: 'aceplayer91',
				totalDeposit: 15400,
				totalWithdraw: 9200,
				totalBonus: 640,
				totalBet: 27880,
				totalWin: 25452,
				netPosition: 2428,
				currency: 'USD',
				updatedAt: '2026-04-29T07:10:00Z'
			},
			{
				id: 'PF-6002',
				username: 'queen7',
				totalDeposit: 8200,
				totalWithdraw: 1500,
				totalBonus: 430,
				totalBet: 13670,
				totalWin: 13901,
				netPosition: -231,
				currency: 'USD',
				updatedAt: '2026-04-29T07:15:00Z'
			},
			{
				id: 'PF-6003',
				username: 'highroller_v',
				totalDeposit: 48200,
				totalWithdraw: 25100,
				totalBonus: 1250,
				totalBet: 71380,
				totalWin: 70040,
				netPosition: 1340,
				currency: 'USD',
				updatedAt: '2026-04-29T07:20:00Z'
			}
		]
	},
	'player-bonus': {
		slug: 'player-bonus',
		title: 'Player Bonus',
		shortTitle: 'Player Bonus',
		description: 'Audit bonus awards, wagering progress, expiration timelines, and final disposition.',
		api: '/api/reports/player-bonus',
		columns: [
			{ accessorKey: 'username', header: 'Username' },
			{ accessorKey: 'bonusName', header: 'Bonus Name' },
			{ accessorKey: 'bonusType', header: 'Bonus Type' },
			amountColumn('awardedAmount', 'Awarded Amount'),
			{ accessorKey: 'wageringRequirement', header: 'Wagering Requirement' },
			amountColumn('consumedAmount', 'Consumed Amount'),
			dateColumn('expiresAt', 'Expires At'),
			statusColumn()
		],
		mockData: [
			{
				id: 'PB-7001',
				username: 'aceplayer91',
				bonusName: 'Weekend Reload',
				bonusType: 'Reload',
				awardedAmount: 75,
				wageringRequirement: '10x',
				consumedAmount: 25,
				currency: 'USD',
				expiresAt: '2026-05-03T23:59:00Z',
				status: 'active'
			},
			{
				id: 'PB-7002',
				username: 'queen7',
				bonusName: 'Cashback Friday',
				bonusType: 'Cashback',
				awardedAmount: 120,
				wageringRequirement: '5x',
				consumedAmount: 120,
				currency: 'USD',
				expiresAt: '2026-04-30T23:59:00Z',
				status: 'completed'
			},
			{
				id: 'PB-7003',
				username: 'highroller_v',
				bonusName: 'VIP Table Bonus',
				bonusType: 'VIP',
				awardedAmount: 300,
				wageringRequirement: '15x',
				consumedAmount: 90,
				currency: 'USD',
				expiresAt: '2026-05-06T23:59:00Z',
				status: 'pending'
			}
		]
	},
	bet: {
		slug: 'bet',
		title: 'Bet',
		shortTitle: 'Bet',
		description: 'Inspect bet placement, markets, potential returns, and settlement outcomes.',
		api: '/api/reports/bet',
		columns: [
			{ accessorKey: 'username', header: 'Username' },
			{ accessorKey: 'game', header: 'Game' },
			{ accessorKey: 'market', header: 'Market' },
			amountColumn('stake', 'Stake'),
			{ accessorKey: 'odds', header: 'Odds' },
			amountColumn('potentialWin', 'Potential Win'),
			{ accessorKey: 'result', header: 'Result' },
			dateColumn('settledAt', 'Settled At'),
			statusColumn()
		],
		mockData: [
			{
				id: 'BT-8001',
				username: 'aceplayer91',
				game: 'Arsenal vs Liverpool',
				market: 'Match Winner',
				stake: 120,
				odds: '2.10',
				potentialWin: 252,
				result: 'Won',
				currency: 'USD',
				settledAt: '2026-04-28T20:50:00Z',
				status: 'settled'
			},
			{
				id: 'BT-8002',
				username: 'queen7',
				game: 'Barcelona vs Sevilla',
				market: 'Over 2.5 Goals',
				stake: 85,
				odds: '1.78',
				potentialWin: 151.3,
				result: 'Lost',
				currency: 'USD',
				settledAt: '2026-04-28T22:30:00Z',
				status: 'settled'
			},
			{
				id: 'BT-8003',
				username: 'highroller_v',
				game: 'Celtics vs Heat',
				market: 'Handicap',
				stake: 250,
				odds: '1.92',
				potentialWin: 480,
				result: 'Open',
				currency: 'USD',
				settledAt: '2026-04-29T10:00:00Z',
				status: 'open'
			}
		]
	}
};

export const reportConfigs = reportConfigEntries;
export const defaultReportSlug: ReportSlug = reportSlugs[0];

export const reportNavigationItems = reportSlugs.map((slug) => ({
	slug,
	title: reportConfigEntries[slug].title,
	shortTitle: reportConfigEntries[slug].shortTitle,
	path: `/reports/${slug}`
}));

export function getReportConfig(slug?: string | null) {
	if (!slug) {
		return reportConfigEntries[defaultReportSlug];
	}

	if (slug in reportConfigEntries) {
		return reportConfigEntries[slug as ReportSlug];
	}

	return null;
}
