import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';

type AgentCoinRowType = {
	id: string;
	agent: string;
	level: string;
	status: 'Active' | 'Low Balance' | 'Paused';
	balance: string;
	total: string;
	loaded: string;
	distributed: string;
	returned: string;
	subs: string;
	players: string;
	ggr: string;
	flag: string;
};

type TransferHistoryRowType = {
	id: string;
	txnId: string;
	time: string;
	type: string;
	from: string;
	to: string;
	coinsNote: string;
	by: string;
};

type CommissionRowType = {
	id: string;
	agent: string;
	level: string;
	playerGcr: string;
	rate: string;
	earnedMtd: string;
	paidOut: string;
	pending: string;
	playersPayoutStatus: 'Paid' | 'Pending' | 'Processing';
};

export type AgentCoinTabType = 'balances' | 'transferHistory' | 'commission';

type AgentCoinManagementTableProps = {
	activeTab: AgentCoinTabType;
};

const balanceRows: AgentCoinRowType[] = [
	{
		id: 'AC-1001',
		agent: 'Ravi master',
		level: 'Master',
		status: 'Active',
		balance: '445454.98',
		total: '445454.98',
		loaded: '3444',
		distributed: '5%',
		returned: '₹ 1288',
		subs: 'Weekly',
		players: '12/Mar/2026',
		ggr: '0',
		flag: '0'
	},
	{
		id: 'AC-1002',
		agent: 'Nina Patel',
		level: 'Senior',
		status: 'Active',
		balance: '384210.50',
		total: '412600.00',
		loaded: '5200',
		distributed: '8%',
		returned: '₹ 950',
		subs: 'Monthly',
		players: '18/Mar/2026',
		ggr: '12,400',
		flag: '0'
	},
	{
		id: 'AC-1003',
		agent: 'Aman Gupta',
		level: 'Master',
		status: 'Low Balance',
		balance: '9800.00',
		total: '226500.00',
		loaded: '1800',
		distributed: '12%',
		returned: '₹ 420',
		subs: 'Weekly',
		players: '21/Mar/2026',
		ggr: '8,100',
		flag: '1'
	},
	{
		id: 'AC-1004',
		agent: 'Yusuf Khan',
		level: 'Associate',
		status: 'Active',
		balance: '145900.75',
		total: '198750.00',
		loaded: '2400',
		distributed: '6%',
		returned: '₹ 780',
		subs: 'Weekly',
		players: '24/Mar/2026',
		ggr: '5,600',
		flag: '0'
	},
	{
		id: 'AC-1005',
		agent: 'Kabir Mehta',
		level: 'Senior',
		status: 'Paused',
		balance: '78240.20',
		total: '156880.00',
		loaded: '900',
		distributed: '3%',
		returned: '₹ 180',
		subs: 'Monthly',
		players: '28/Mar/2026',
		ggr: '2,900',
		flag: '0'
	}
];

const transferHistoryRows: TransferHistoryRowType[] = [
	{
		id: 'TH-1001',
		txnId: 'CTX-8837',
		time: '14:34',
		type: 'Admin Load',
		from: 'Admin',
		to: 'Ravi Master(AGT-001)',
		coinsNote: '2.0L Weekly top-up, IMPS, ref#Up1881',
		by: '₹ 1288'
	},
	{
		id: 'TH-1002',
		txnId: 'CTX-8837',
		time: '14:34',
		type: 'Distribute',
		from: 'Ravi Master(AGT-001)',
		to: 'Sunil Kumar Sharma (AGT-001)',
		coinsNote: '2.0L Weekly top-up, IMPS, ref#Up1881',
		by: '₹ 1288'
	},
	{
		id: 'TH-1003',
		txnId: 'CTX-8837',
		time: '14:34',
		type: 'To Player',
		from: 'Admin',
		to: 'Ravi Master(AGT-001)',
		coinsNote: '2.0L Weekly top-up, IMPS, ref#Up1881',
		by: '₹ 1288'
	},
	{
		id: 'TH-1004',
		txnId: 'CTX-8837',
		time: '14:34',
		type: 'Player return',
		from: 'Admin',
		to: 'Ravi Master(AGT-001)',
		coinsNote: '2.0L Weekly top-up, IMPS, ref#Up1881',
		by: '₹ 1288'
	},
	{
		id: 'TH-1005',
		txnId: 'CTX-8837',
		time: '14:34',
		type: 'Commission',
		from: 'Admin',
		to: 'Ravi Master(AGT-001)',
		coinsNote: '2.0L Weekly top-up, IMPS, ref#Up1881',
		by: '₹ 1288'
	},
	{
		id: 'TH-1006',
		txnId: 'CTX-8837',
		time: '14:34',
		type: 'Adjustment',
		from: 'Admin',
		to: 'Ravi Master(AGT-001)',
		coinsNote: '2.0L Weekly top-up, IMPS, ref#Up1881',
		by: '₹ 1288'
	}
];

const commissionRows: CommissionRowType[] = [
	{
		id: 'CM-1001',
		agent: 'Ravi master',
		level: 'Master',
		playerGcr: '₹ 1,24,800',
		rate: '5%',
		earnedMtd: '₹ 6,240',
		paidOut: '₹ 4,120',
		pending: '₹ 2,120',
		playersPayoutStatus: 'Processing'
	},
	{
		id: 'CM-1002',
		agent: 'Nina Patel',
		level: 'Senior',
		playerGcr: '₹ 98,400',
		rate: '4%',
		earnedMtd: '₹ 3,936',
		paidOut: '₹ 3,936',
		pending: '₹ 0',
		playersPayoutStatus: 'Paid'
	},
	{
		id: 'CM-1003',
		agent: 'Aman Gupta',
		level: 'Master',
		playerGcr: '₹ 74,200',
		rate: '6%',
		earnedMtd: '₹ 4,452',
		paidOut: '₹ 0',
		pending: '₹ 4,452',
		playersPayoutStatus: 'Pending'
	},
	{
		id: 'CM-1004',
		agent: 'Yusuf Khan',
		level: 'Associate',
		playerGcr: '₹ 52,600',
		rate: '3%',
		earnedMtd: '₹ 1,578',
		paidOut: '₹ 1,000',
		pending: '₹ 578',
		playersPayoutStatus: 'Processing'
	},
	{
		id: 'CM-1005',
		agent: 'Kabir Mehta',
		level: 'Senior',
		playerGcr: '₹ 61,900',
		rate: '4%',
		earnedMtd: '₹ 2,476',
		paidOut: '₹ 2,476',
		pending: '₹ 0',
		playersPayoutStatus: 'Paid'
	}
];

const statusClassMap: Record<AgentCoinRowType['status'], string> = {
	Active: 'bg-emerald-100 text-emerald-700',
	'Low Balance': 'bg-amber-100 text-amber-700',
	Paused: 'bg-slate-100 text-slate-700'
};

const commissionStatusClassMap: Record<CommissionRowType['playersPayoutStatus'], string> = {
	Paid: 'bg-emerald-100 text-emerald-700',
	Pending: 'bg-amber-100 text-amber-700',
	Processing: 'bg-blue-50 text-blue-600'
};

function AgentCoinManagementTable({ activeTab }: AgentCoinManagementTableProps) {
	const balanceColumns = useMemo<MRT_ColumnDef<AgentCoinRowType>[]>(
		() => [
			{
				accessorKey: 'agent',
				header: 'Agent',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.agent}</span>
			},
			{
				accessorKey: 'level',
				header: 'Level',
				Cell: ({ row }) => (
					<span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
						{row.original.level}
					</span>
				)
			},
			{
				accessorKey: 'status',
				header: 'Status',
				Cell: ({ row }) => (
					<span
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold ${statusClassMap[row.original.status]}`}
					>
						{row.original.status}
					</span>
				)
			},
			{
				accessorKey: 'balance',
				header: 'Balance'
			},
			{
				accessorKey: 'total',
				header: 'Total'
			},
			{
				accessorKey: 'loaded',
				header: 'Loaded'
			},
			{
				accessorKey: 'distributed',
				header: 'Distributed'
			},
			{
				accessorKey: 'returned',
				header: 'Returned'
			},
			{
				accessorKey: 'subs',
				header: 'Subs'
			},
			{
				accessorKey: 'players',
				header: 'Players'
			},
			{
				accessorKey: 'ggr',
				header: 'GGR'
			},
			{
				accessorKey: 'flag',
				header: 'Flag'
			}
		],
		[]
	);

	const transferHistoryColumns = useMemo<MRT_ColumnDef<TransferHistoryRowType>[]>(
		() => [
			{
				accessorKey: 'txnId',
				header: 'Txn ID',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.txnId}</span>
			},
			{
				accessorKey: 'time',
				header: 'Time'
			},
			{
				accessorKey: 'type',
				header: 'Type',
				Cell: ({ row }) => (
					<span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
						{row.original.type}
					</span>
				)
			},
			{
				accessorKey: 'from',
				header: 'From'
			},
			{
				accessorKey: 'to',
				header: 'To'
			},
			{
				accessorKey: 'coinsNote',
				header: 'Coins Note',
				Cell: ({ row }) => (
					<span className="font-medium text-slate-800">
						<span className="font-bold text-blue-600">2.0L</span>
						{row.original.coinsNote.replace('2.0L', '')}
					</span>
				)
			},
			{
				accessorKey: 'by',
				header: 'By',
				Cell: ({ row }) => <span className="font-bold text-slate-900">{row.original.by}</span>
			}
		],
		[]
	);

	const commissionColumns = useMemo<MRT_ColumnDef<CommissionRowType>[]>(
		() => [
			{
				accessorKey: 'agent',
				header: 'Agent',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.agent}</span>
			},
			{
				accessorKey: 'level',
				header: 'Level',
				Cell: ({ row }) => (
					<span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
						{row.original.level}
					</span>
				)
			},
			{
				accessorKey: 'playerGcr',
				header: 'Player GCR',
				Cell: ({ row }) => <span className="font-bold text-slate-900">{row.original.playerGcr}</span>
			},
			{
				accessorKey: 'rate',
				header: 'Rate'
			},
			{
				accessorKey: 'earnedMtd',
				header: 'Earned (MTD)',
				Cell: ({ row }) => <span className="font-bold text-slate-900">{row.original.earnedMtd}</span>
			},
			{
				accessorKey: 'paidOut',
				header: 'Paid out',
				Cell: ({ row }) => <span className="font-bold text-emerald-600">{row.original.paidOut}</span>
			},
			{
				accessorKey: 'pending',
				header: 'Pending',
				Cell: ({ row }) => <span className="font-bold text-amber-600">{row.original.pending}</span>
			},
			{
				accessorKey: 'playersPayoutStatus',
				header: 'Players Payout Status',
				Cell: ({ row }) => (
					<span
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold ${commissionStatusClassMap[row.original.playersPayoutStatus]}`}
					>
						{row.original.playersPayoutStatus}
					</span>
				)
			}
		],
		[]
	);

	if (activeTab === 'transferHistory') {
		return (
			<Paper
				className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				elevation={0}
			>
				<DataTable
					data={transferHistoryRows}
					columns={transferHistoryColumns}
					muiSearchTextFieldProps={{
						placeholder: 'Search...',
						sx: {
							minWidth: '300px'
						}
					}}
					enableRowSelection={false}
					enableExpanding={false}
					enableRowNumbers={false}
					renderRowActionMenuItems={() => []}
					renderRowActions={({ row }) => (
						<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
							<button
								type="button"
								className="flex items-center gap-1"
								aria-label={`View ${row.original.txnId}`}
							>
								<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
								<span className="text-[11px]">View</span>
							</button>
						</div>
					)}
				/>
			</Paper>
		);
	}

	if (activeTab === 'commission') {
		return (
			<Paper
				className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				elevation={0}
			>
				<DataTable
					data={commissionRows}
					columns={commissionColumns}
					muiSearchTextFieldProps={{
						placeholder: 'Search...',
						sx: {
							minWidth: '300px'
						}
					}}
					enableRowSelection={false}
					enableExpanding={false}
					enableRowNumbers={false}
					renderRowActionMenuItems={() => []}
					renderRowActions={({ row }) => (
						<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
							<button
								type="button"
								className="flex items-center gap-1"
								aria-label={`View ${row.original.agent}`}
							>
								<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
								<span className="text-[11px]">View</span>
							</button>
						</div>
					)}
				/>
			</Paper>
		);
	}

	return (
		<Paper
			className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
			elevation={0}
		>
			<DataTable
				data={balanceRows}
				columns={balanceColumns}
				muiSearchTextFieldProps={{
					placeholder: 'Search...',
					sx: {
						minWidth: '300px'
					}
				}}
				enableRowSelection={false}
				enableExpanding={false}
				enableRowNumbers={false}
				renderRowActionMenuItems={() => []}
				renderRowActions={({ row }) => (
					<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
						<button
							type="button"
							className="flex items-center gap-1"
							aria-label={`View ${row.original.agent}`}
						>
							<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
							<span className="text-[11px]">View</span>
						</button>
					</div>
				)}
			/>
		</Paper>
	);
}

export default AgentCoinManagementTable;
