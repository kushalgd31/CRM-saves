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
				agenttree: 'North Region > Tier 1',
				bet: 245000,
				win: 189500,
				ggr: 55500,
				bonus: 4200,
				ngr: 51300,
				mycomission: 6156,
				myrevenue: 21840,
				nodeposits: 38,
				totaldeposit: 75320,
				nowithdraw: 14,
				totalwithdraw: 32450,
				registeration: '2024-11-21',
				currency: 'USD',
				status: 'completed'
			},
			{
				id: 'AR-1002',
				agentName: 'Nina Patel',
				agenttree: 'South Region > Tier 2',
				bet: 172300,
				win: 146200,
				ggr: 26100,
				bonus: 1800,
				ngr: 24300,
				mycomission: 2430,
				myrevenue: 14670,
				nodeposits: 26,
				totaldeposit: 49150,
				nowithdraw: 10,
				totalwithdraw: 18230,
				registeration: '2024-12-03',
				currency: 'USD',
				status: 'pending'
			},
			{
				id: 'AR-1003',
				agentName: 'Yusuf Khan',
				agenttree: 'West Region > Tier 3',
				bet: 98020,
				win: 72300,
				ggr: 25720,
				bonus: 950,
				ngr: 24770,
				mycomission: 1982,
				myrevenue: 22788,
				nodeposits: 18,
				totaldeposit: 30410,
				nowithdraw: 8,
				totalwithdraw: 18360,
				registeration: '2024-11-29',
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
			{ accessorKey: 'bet', header: 'Bet' },
			{ accessorKey: 'totalbet', header: 'Total Bet Count' },
			{ accessorKey: 'win', header: 'Win' },
			{ accessorKey: 'ggr', header: 'GGR' },
			{ accessorKey: 'bonus', header: 'Bonus' },
			{ accessorKey: 'ngr', header: 'NGR' },
			{ accessorKey: 'totalcashAdmin', header: 'Total Cash Deposit By Admin' },
			{ accessorKey: 'totalNcashAdmin', header: 'Total Non Cash Deposit By Admin' },
			{ accessorKey: 'totalcashUser', header: 'Total Manual Cash Deposit By User' },
			{ accessorKey: 'totalcashGUser', header: 'Total Cash Deposit (Gateway) By User' },
			{ accessorKey: 'totaldeposit', header: 'Total Deposit' },
			{ accessorKey: 'totalNcashwithdrawAdmin', header: 'Total Non Cash Withdraw By Admin' },
			{ accessorKey: 'totalcashwithdrawUser', header: 'Total Manual Cash Withdraw By User' },
			{ accessorKey: 'totalcashwithdrawGUser', header: 'Total Cash Withdraw (Gateway) By User' },
			{ accessorKey: 'totalcashwithdrawAdmin', header: 'Total Cash Withdraw By Admin' },
			{ accessorKey: 'withdrawals', header: 'Total Withdrawals' },
			{ accessorKey: 'vip', header: 'VIP Level' },
			{ accessorKey: 'affiliate', header: 'Affiliate Code' },
			
		],
		mockData: [
			{
				id: 'PR-2001',
				userid: 'U-1001',
				name: 'Aiden Cole',
				email: 'aiden.cole@example.com',
				registration: '2024-08-03',
				agentname: 'Rohan Malhotra',
				bet: 3420,
				totalbet: 27,
				win: 2980,
				ggr: 440,
				bonus: 55,
				ngr: 385,
				totalcashAdmin: 1200,
				totalNcashAdmin: 0,
				totalcashUser: 760,
				totalcashGUser: 430,
				totaldeposit: 2390,
				totalNcashwithdrawAdmin: 0,
				totalcashwithdrawUser: 220,
				totalcashwithdrawGUser: 180,
				totalcashwithdrawAdmin: 0,
				withdrawals: 5,
				vip: 'Gold',
				affiliate: 'AFF123'
			},
			{
				id: 'PR-2002',
				userid: 'U-1002',
				name: 'Mia Sanders',
				email: 'mia.sanders@example.com',
				registration: '2024-09-12',
				agentname: 'Nina Patel',
				bet: 5980,
				totalbet: 42,
				win: 6210,
				ggr: -230,
				bonus: 30,
				ngr: -260,
				totalcashAdmin: 0,
				totalNcashAdmin: 200,
				totalcashUser: 1250,
				totalcashGUser: 320,
				totaldeposit: 1770,
				totalNcashwithdrawAdmin: 50,
				totalcashwithdrawUser: 340,
				totalcashwithdrawGUser: 90,
				totalcashwithdrawAdmin: 20,
				withdrawals: 4,
				vip: 'Silver',
				affiliate: 'AFF234'
			},
			{
				id: 'PR-2003',
				userid: 'U-1003',
				name: 'Victor Han',
				email: 'victor.han@example.com',
				registration: '2024-06-19',
				agentname: 'Yusuf Khan',
				bet: 11200,
				totalbet: 68,
				win: 9800,
				ggr: 1400,
				bonus: 120,
				ngr: 1260,
				totalcashAdmin: 0,
				totalNcashAdmin: 450,
				totalcashUser: 3320,
				totalcashGUser: 520,
				totaldeposit: 4290,
				totalNcashwithdrawAdmin: 0,
				totalcashwithdrawUser: 660,
				totalcashwithdrawGUser: 120,
				totalcashwithdrawAdmin: 0,
				withdrawals: 8,
				vip: 'Platinum',
				affiliate: 'AFF345'
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
			{ accessorKey: 'playerid', header: 'Player ID' },
			{ accessorKey: 'player', header: 'Player Name' },
			{ accessorKey: 'agent', header: 'Agent Name' },
			{ accessorKey: 'gameprovider', header: 'Game Provider' },
			{ accessorKey: 'gamename', header: 'Game Name' },
			{ accessorKey: 'tableid', header: 'Table ID' },
			{ accessorKey: 'roundid', header: 'Round ID' },
			{ accessorKey: 'activitytime', header: 'Activity Timestamp' },
			{ accessorKey: 'actiontype', header: 'Action Type' },
			{ accessorKey: 'initbalance', header: 'Initial Balance' },
			{ accessorKey: 'playedamount', header: 'Played Amount' },
			{ accessorKey: 'endingbalance', header: 'Ending Balance' },
			{ accessorKey: 'transactionid', header: 'Transaction ID' },
			{ accessorKey: 'internaltrackid', header: 'Internal Tracking ID' },
			{ accessorKey: 'debittransactionid', header: 'Debit Transaction ID' },
			{ accessorKey: 'details', header: 'Details' },
		],
		mockData: [
			{
				id: 'GT-3001',
				playerid: 'U-1001',
				player: 'Aiden Cole',
				agent: 'Rohan Malhotra',
				gameprovider: 'Evolution',
				gamename: 'Roulette Royale',
				tableid: 'T-42',
				roundid: 'RD-887100',
				activitytime: '2026-04-29T02:15:00Z',
				actiontype: 'Bet',
				initbalance: 2535,
				playedamount: 125,
				endingbalance: 2410,
				transactionid: 'TXN-GT-3001',
				internaltrackid: 'TRACK-GT-01',
				debittransactionid: 'DBT-GT-01',
				details: 'Straight bet on roulette red',
				status: 'settled'
			},
			{
				id: 'GT-3002',
				playerid: 'U-1002',
				player: 'Mia Sanders',
				agent: 'Nina Patel',
				gameprovider: 'Pragmatic Play',
				gamename: 'Lucky Sevens',
				tableid: 'T-08',
				roundid: 'RD-887126',
				activitytime: '2026-04-29T02:21:00Z',
				actiontype: 'Win',
				initbalance: 6210,
				playedamount: 320,
				endingbalance: 6530,
				transactionid: 'TXN-GT-3002',
				internaltrackid: 'TRACK-GT-02',
				debittransactionid: 'DBT-GT-02',
				details: 'Slot jackpot win',
				status: 'completed'
			},
			{
				id: 'GT-3003',
				playerid: 'U-1003',
				player: 'Victor Han',
				agent: 'Yusuf Khan',
				gameprovider: 'SA Gaming',
				gamename: 'Dragon Tiger',
				tableid: 'T-19',
				roundid: 'RD-887149',
				activitytime: '2026-04-29T02:35:00Z',
				actiontype: 'Refund',
				initbalance: 9970,
				playedamount: 80,
				endingbalance: 9890,
				transactionid: 'TXN-GT-3003',
				internaltrackid: 'TRACK-GT-03',
				debittransactionid: 'DBT-GT-03',
				details: 'Void bet returned',
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
			{ accessorKey: 'playerid', header: 'Player ID' },
			{ accessorKey: 'playername', header: 'PlayerName' },
			{ accessorKey: 'agentName', header: 'AgentName' },
			{ accessorKey: 'country', header: 'Country' },
			{ accessorKey: 'vipLevel', header: 'VIP Level' },
			{ accessorKey:'currentBalance', header: 'Current Total Balance'},
			{ accessorKey: 'firstdeposit', header: 'First Deposit Amount' },
			{ accessorKey: 'firstdepositid', header: 'First Deposit Amount Trx ID' },
			{ accessorKey: 'firstdeposittime', header: 'First Deposit Timestamp' },
			{ accessorKey: 'totalbets', header: 'Total Bets' },
			{ accessorKey: 'totalbetAmt', header: 'Total Bet Amount' },
			{ accessorKey:'playerregister', header:'Player Registration Date'},
			{ accessorKey:'lastlogin', header:'Last Login Date'},
			{ accessorKey: 'depositcount', header: 'Deposit Count' },
			{ accessorKey:'totaldepositAmt', header:'Total Deposit Amount'},
			{ accessorKey: 'withdrawcount', header: 'Withdrawal Count' },
			{accessorKey:'totalwithdrawAmt', header:'Total Withdraw Amount'},
			{accessorKey:'cashdepositAmt', header:'Cash Deposit Amount'},
			{accessorKey:'NcashdepositAmt', header:'Non Cash Deposit Amount'},
			{accessorKey:'cashwithdrawAmt',header:'Cash Withdraw Amount'},
			{accessorKey:'NcashwithdrawAmt',header:'Non Cash Withdraw Amount'},
			{ accessorKey: 'bonus', header: 'Bonus' }
		],
		mockData: [
			{
				id: 'PL-4001',
				playerid: 'U-1001',
				playername: 'Aiden Cole',
				agentName: 'Rohan Malhotra',
				country: 'USA',
				vipLevel: 'Gold',
				currentBalance: 2410,
				firstdeposit: 1200,
				firstdepositid: 'FD-1101',
				firstdeposittime: '2024-08-03T09:12:00Z',
				totalbets: 82,
				totalbetAmt: 15400,
				playerregister: '2024-08-03',
				lastlogin: '2026-04-29T06:12:00Z',
				depositcount: 14,
				totaldepositAmt: 15400,
				withdrawcount: 7,
				totalwithdrawAmt: 9200,
				cashdepositAmt: 10400,
				NcashdepositAmt: 5000,
				cashwithdrawAmt: 7200,
				NcashwithdrawAmt: 2000,
				bonus: 320
			},
			{
				id: 'PL-4002',
				playerid: 'U-1002',
				playername: 'Mia Sanders',
				agentName: 'Nina Patel',
				country: 'Canada',
				vipLevel: 'Silver',
				currentBalance: 6530,
				firstdeposit: 780,
				firstdepositid: 'FD-1102',
				firstdeposittime: '2024-09-12T11:20:00Z',
				totalbets: 60,
				totalbetAmt: 8200,
				playerregister: '2024-09-12',
				lastlogin: '2026-04-29T04:05:00Z',
				depositcount: 11,
				totaldepositAmt: 8200,
				withdrawcount: 5,
				totalwithdrawAmt: 3200,
				cashdepositAmt: 6200,
				NcashdepositAmt: 2000,
				cashwithdrawAmt: 2700,
				NcashwithdrawAmt: 500,
				bonus: 140
			},
			{
				id: 'PL-4003',
				playerid: 'U-1003',
				playername: 'Victor Han',
				agentName: 'Yusuf Khan',
				country: 'Australia',
				vipLevel: 'Platinum',
				currentBalance: 9890,
				firstdeposit: 4200,
				firstdepositid: 'FD-1103',
				firstdeposittime: '2024-06-19T14:50:00Z',
				totalbets: 143,
				totalbetAmt: 48200,
				playerregister: '2024-06-19',
				lastlogin: '2026-04-28T21:55:00Z',
				depositcount: 21,
				totaldepositAmt: 48200,
				withdrawcount: 12,
				totalwithdrawAmt: 15800,
				cashdepositAmt: 31000,
				NcashdepositAmt: 17200,
				cashwithdrawAmt: 13200,
				NcashwithdrawAmt: 2600,
				bonus: 760
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
			{ accessorKey: 'id', header: '#' },
			{ accessorKey: 'playerid', header: 'Player ID' },
			{ accessorKey: 'name', header: 'Playername' },
			{ accessorKey: 'agentname', header: 'Agent Name' },
			{ accessorKey: 'roundid', header: 'Round ID' },
			{ accessorKey: 'transaction', header: 'Transaction ID' },
			{ accessorKey: 'type', header: 'Type' },
			{ accessorKey: 'actiontype', header: 'Action Type' },
			{ accessorKey: 'gametype', header: 'Game Type' },
			{ accessorKey: 'tableid', header: 'Table ID' },
			{ accessorKey: 'activitytime', header: 'Activity Timestamp' },
			{ accessorKey: 'initbal', header: 'Initial Balance' },
			{ accessorKey: 'bet/withdraw', header: 'Bet/Withdraw' },
			{ accessorKey: 'win/deposit', header: 'Win/Deposit' },
			{ accessorKey: 'endingbal', header: 'Ending Balance' },
			{ accessorKey: 'revenue', header: 'Revenue'},
			{ accessorKey: 'status', header: 'Status' },
			{ accessorKey: 'internalTrackid', header: 'Internal Tracking ID' },
			{ accessorKey: 'details', header: 'Details' },
			
		],
		mockData: [
			{
				id: 'UT-5001',
				playerid: 'U-1001',
				name: 'Aiden Cole',
				agentname: 'Rohan Malhotra',
				roundid: 'RD-208871',
				transaction: 'TXN-208871',
				type: 'Deposit',
				actiontype: 'Credit',
				gametype: 'Wallet',
				tableid: 'N/A',
				activitytime: '2026-04-28T15:30:00Z',
				initbal: 1910,
				'bet/withdraw': 500,
				'win/deposit': 0,
				endingbal: 2410,
				revenue: 0,
				status: 'completed',
				internalTrackid: 'TRACK-UT-01',
				details: 'Deposit processed successfully'
			},
			{
				id: 'UT-5002',
				playerid: 'U-1002',
				name: 'Mia Sanders',
				agentname: 'Nina Patel',
				roundid: 'RD-208923',
				transaction: 'TXN-208923',
				type: 'Bonus',
				actiontype: 'Conversion',
				gametype: 'Bonus',
				tableid: 'N/A',
				activitytime: '2026-04-29T01:05:00Z',
				initbal: 6650,
				'bet/withdraw': 120,
				'win/deposit': 120,
				endingbal: 6530,
				revenue: 0,
				status: 'completed',
				internalTrackid: 'TRACK-UT-02',
				details: 'Bonus conversion applied'
			},
			{
				id: 'UT-5003',
				playerid: 'U-1003',
				name: 'Victor Han',
				agentname: 'Yusuf Khan',
				roundid: 'RD-208955',
				transaction: 'TXN-208955',
				type: 'Withdrawal',
				actiontype: 'Debit',
				gametype: 'Wallet',
				tableid: 'N/A',
				activitytime: '2026-04-29T03:20:00Z',
				initbal: 10640,
				'bet/withdraw': 750,
				'win/deposit': 0,
				endingbal: 9890,
				revenue: 0,
				status: 'processing',
				internalTrackid: 'TRACK-UT-03',
				details: 'Withdrawal request in progress'
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
			{ accessorKey: 'id', header: '#' },
			{ accessorKey: 'playerid', header: 'Player ID' },
			{ accessorKey: 'name', header: 'Playername' },
			{ accessorKey: 'agentname', header: 'Agent Name' },
			{ accessorKey: 'transactiontime', header: 'Transaction Timestamp' },
			{ accessorKey: 'actiontype', header: 'Action Type' },
			{ accessorKey: 'initbal', header: 'Initial Balance' },
			{ accessorKey: 'amt', header: 'Amount' },
			{ accessorKey: 'endingbal', header: 'Ending Balance' },
			{ accessorKey: 'transfermethod', header: 'Transfer Method' },
			{ accessorKey: 'status', header: 'Status' },
			{ accessorKey: 'description', header: 'Description' },
			{ accessorKey: 'TransactionReceipt', header: 'Transaction Receipt' },
			{ accessorKey: 'transaction', header: 'Transaction ID' },
			{ accessorKey: 'internalTrackid', header: 'Internal Tracking ID' },
			{ accessorKey: 'details', header: 'Details' },


		],
		mockData: [
			{
				id: 'PF-6001',
				playerid: 'U-1001',
				name: 'Aiden Cole',
				agentname: 'Rohan Malhotra',
				transactiontime: '2026-04-29T07:10:00Z',
				actiontype: 'Deposit',
				initbal: 1900,
				amt: 500,
				endingbal: 2400,
				transfermethod: 'Bank Transfer',
				status: 'completed',
				description: 'Approved deposit from finance',
				TransactionReceipt: 'RCPT-6001',
				transaction: 'TXN-PF-6001',
				internalTrackid: 'TRACK-PF-01',
				details: 'Manual cash deposit settled'
			},
			{
				id: 'PF-6002',
				playerid: 'U-1002',
				name: 'Mia Sanders',
				agentname: 'Nina Patel',
				transactiontime: '2026-04-29T07:15:00Z',
				actiontype: 'Withdrawal',
				initbal: 3500,
				amt: 1500,
				endingbal: 2000,
				transfermethod: 'E-Wallet',
				status: 'completed',
				description: 'User payout processed',
				TransactionReceipt: 'RCPT-6002',
				transaction: 'TXN-PF-6002',
				internalTrackid: 'TRACK-PF-02',
				details: 'Withdrawal cleared by admin'
			},
			{
				id: 'PF-6003',
				playerid: 'U-1003',
				name: 'Victor Han',
				agentname: 'Yusuf Khan',
				transactiontime: '2026-04-29T07:20:00Z',
				actiontype: 'Bet Adjustment',
				initbal: 7200,
				amt: 300,
				endingbal: 6900,
				transfermethod: 'Internal Ledger',
				status: 'processing',
				description: 'Adjustment for bonus settlement',
				TransactionReceipt: 'RCPT-6003',
				transaction: 'TXN-PF-6003',
				internalTrackid: 'TRACK-PF-03',
				details: 'Balance correction applied'
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
			{ accessorKey: 'playerid', header: 'Player ID' },
			{ accessorKey: 'name', header: 'Playername' },
			{ accessorKey: 'agentname', header: 'Agent Name' },
			{ accessorKey: 'd&t', header: 'Date&Time' },
			{ accessorKey: 'actiontype', header: 'Action Type' },
			{ accessorKey: 'initbonusbal', header: 'Initial Bonus Balance' },
			{ accessorKey: 'amt', header: 'Amount' },
			{ accessorKey: 'endingbonusbal', header: 'Ending Bonus Balance' },
			{ accessorKey: 'bonustype', header: 'Bonus Type' },
			{ accessorKey: 'bonuscode', header: 'Bonus Code' },
			{ accessorKey: 'transaction', header: 'Transaction ID' },
			{ accessorKey: 'internalTrackid', header: 'Internal Tracking ID' },

		],
		mockData: [
			{
				id: 'PB-7001',
				playerid: 'U-1001',
				name: 'Aiden Cole',
				agentname: 'Rohan Malhotra',
				'd&t': '2026-04-25T12:00:00Z',
				actiontype: 'Awarded',
				initbonusbal: 100,
				amt: 75,
				endingbonusbal: 175,
				bonustype: 'Reload',
				bonuscode: 'RB-2026',
				transaction: 'TXN-PB-7001',
				internalTrackid: 'TRACK-PB-01'
			},
			{
				id: 'PB-7002',
				playerid: 'U-1002',
				name: 'Mia Sanders',
				agentname: 'Nina Patel',
				'd&t': '2026-04-27T14:45:00Z',
				actiontype: 'Redeemed',
				initbonusbal: 120,
				amt: 120,
				endingbonusbal: 0,
				bonustype: 'Cashback',
				bonuscode: 'CB-2026',
				transaction: 'TXN-PB-7002',
				internalTrackid: 'TRACK-PB-02'
			},
			{
				id: 'PB-7003',
				playerid: 'U-1003',
				name: 'Victor Han',
				agentname: 'Yusuf Khan',
				'd&t': '2026-04-28T17:30:00Z',
				actiontype: 'Issued',
				initbonusbal: 300,
				amt: 90,
				endingbonusbal: 390,
				bonustype: 'VIP',
				bonuscode: 'VIP-2026',
				transaction: 'TXN-PB-7003',
				internalTrackid: 'TRACK-PB-03'
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
			{ accessorKey: 'internalid', header: 'Internal ID' },
			{ accessorKey: 'd&t', header: 'Date&Time' },
			{ accessorKey: 'name', header: 'Playername' }, 
			{ accessorKey: 'marketid', header: 'Market ID' },
			{ accessorKey: 'betid', header: 'Bet ID' },
			{ accessorKey: 'marketname', header: 'Market Name' },
			{ accessorKey: 'placedbeton', header: 'Placed Bet On' },
			{ accessorKey: 'TeamBetOn', header: 'Team Placed Bet On' },
			{ accessorKey: 'bettype', header: 'Bet Type' },
			{ accessorKey: 'run', header: 'Run' },
			{ accessorKey: 'stake', header: 'Stake Amount' },
			{ accessorKey: 'odds', header: 'Odds' },
			{ accessorKey: 'actiontype', header: 'Action Type' },
			{ accessorKey: 'currency', header: 'Currency' },
			{ accessorKey: 'TransactionAmt', header: 'Transaction Amount' },
			{ accessorKey: 'status', header: 'Status' },
			{ accessorKey: 'possibleWinAmt', header: 'Possible Win Amount' },
			{ accessorKey: 'commissiondetails', header: 'Commission Details' },
			{ accessorKey: 'comments', header: 'Comments' },
			{ accessorKey: 'details', header: 'Details' },
			
		],
		mockData: [
			{
				id: 'BT-8001',
				internalid: 'BID-8001',
				'd&t': '2026-04-28T20:10:00Z',
				name: 'Aiden Cole',
				marketid: 'MKT-3001',
				betid: 'BET-7001',
				marketname: 'Match Winner',
				placedbeton: 'Arsenal',
				TeamBetOn: 'Arsenal',
				bettype: 'Single',
				run: 'Full Match',
				stake: 120,
				odds: '2.10',
				actiontype: 'Place Bet',
				currency: 'USD',
				TransactionAmt: 120,
				status: 'settled',
				possibleWinAmt: 252,
				commissiondetails: '0.5% commission',
				comments: 'Bet won',
				details: 'Placed before kick-off'
			},
			{
				id: 'BT-8002',
				internalid: 'BID-8002',
				'd&t': '2026-04-28T22:10:00Z',
				name: 'Mia Sanders',
				marketid: 'MKT-3002',
				betid: 'BET-7002',
				marketname: 'Over 2.5 Goals',
				placedbeton: 'Barcelona',
				TeamBetOn: 'Barcelona',
				bettype: 'Single',
				run: 'Match Result',
				stake: 85,
				odds: '1.78',
				actiontype: 'Place Bet',
				currency: 'USD',
				TransactionAmt: 85,
				status: 'settled',
				possibleWinAmt: 151.3,
				commissiondetails: '0.5% commission',
				comments: 'Bet lost',
				details: 'Late match bet'
			},
			{
				id: 'BT-8003',
				internalid: 'BID-8003',
				'd&t': '2026-04-29T10:00:00Z',
				name: 'Victor Han',
				marketid: 'MKT-3003',
				betid: 'BET-7003',
				marketname: 'Handicap',
				placedbeton: 'Celtics',
				TeamBetOn: 'Celtics',
				bettype: 'Handicap',
				run: 'Second Half',
				stake: 250,
				odds: '1.92',
				actiontype: 'Place Bet',
				currency: 'USD',
				TransactionAmt: 250,
				status: 'open',
				possibleWinAmt: 480,
				commissiondetails: '0.5% commission',
				comments: 'Awaiting settlement',
				details: 'Handicap market bet'
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
