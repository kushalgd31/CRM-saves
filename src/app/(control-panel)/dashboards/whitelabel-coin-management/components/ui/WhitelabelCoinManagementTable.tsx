import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';

export type WhitelabelCoinTabType = 'overview' | 'coinTransfer' | 'ggrBilling';

type WhitelabelCoinManagementTableProps = {
	activeTab: WhitelabelCoinTabType;
};

type WhitelabelOverviewRowType = {
	id: string;
	whitelabel: string;
	status: 'Active' | 'Paused';
	coinBal: string;
	loaded: string;
	consumed: string;
	agents: string;
	players: string;
	mtd: string;
	ggr: string;
	rate: string;
	fee: string;
	ow: string;
};

type CoinTransferRowType = {
	id: string;
	txnId: string;
	date: string;
	type: string;
	whitelabel: string;
	coins: string;
	amountPaid: string;
	payment: string;
	referenceNote: string;
	by: string;
};

type GgrBillingRowType = {
	id: string;
	whitelabel: string;
	period: string;
	gcr: string;
	rate: string;
	platformFee: string;
	coinCredit: string;
	netPayable: string;
	invoice: string;
	status: 'Paid' | 'Overdue' | 'Pending';
	dueDate: string;
};

const overviewRows: WhitelabelOverviewRowType[] = [
	{
		id: 'WLO-1001',
		whitelabel: 'Betking India',
		status: 'Active',
		coinBal: 'Master',
		loaded: '445454.98',
		consumed: '445454.98',
		agents: '3444',
		players: '5%',
		mtd: '₹ 1288',
		ggr: 'Weekly',
		rate: '12/Mar/2026',
		fee: '0',
		ow: '0'
	},
	{
		id: 'WLO-1002',
		whitelabel: 'Ravi master',
		status: 'Active',
		coinBal: 'Master',
		loaded: '445454.98',
		consumed: '445454.98',
		agents: '3444',
		players: '5%',
		mtd: '₹ 1288',
		ggr: 'Weekly',
		rate: '12/Mar/2026',
		fee: '0',
		ow: '0'
	},
	{
		id: 'WLO-1003',
		whitelabel: 'Goa247',
		status: 'Active',
		coinBal: 'Master',
		loaded: '445454.98',
		consumed: '445454.98',
		agents: '3444',
		players: '5%',
		mtd: '₹ 1288',
		ggr: 'Weekly',
		rate: '12/Mar/2026',
		fee: '0',
		ow: '0'
	}
];

const coinTransferRows: CoinTransferRowType[] = [
	{
		id: 'WCT-1001',
		txnId: 'WCX-2241',
		date: '23 Apr',
		type: 'Coin Load',
		whitelabel: 'Betking India(WI-001)',
		coins: '5.0L',
		amountPaid: '₹5.0L',
		payment: 'IMPS',
		referenceNote: 'UTR 2333999338- Monthly top-up',
		by: 'SuperAdmin'
	},
	{
		id: 'WCT-1002',
		txnId: 'WCX-2241',
		date: '23 Apr',
		type: 'Master',
		whitelabel: '445454.98',
		coins: '445454.98',
		amountPaid: '3444',
		payment: '5%',
		referenceNote: 'UTR 2333999338- Monthly top-up',
		by: 'Weekly'
	},
	{
		id: 'WCT-1003',
		txnId: 'WCX-2241',
		date: '23 Apr',
		type: 'Master',
		whitelabel: '445454.98',
		coins: '445454.98',
		amountPaid: '3444',
		payment: '5%',
		referenceNote: '₹ 1288',
		by: 'Weekly'
	}
];

const ggrBillingRows: GgrBillingRowType[] = [
	{
		id: 'GGR-1001',
		whitelabel: 'Betking India',
		period: 'Apr 2026',
		gcr: '14.2L',
		rate: '20%',
		platformFee: '5.0L',
		coinCredit: '₹5.0L',
		netPayable: 'IMPS',
		invoice: 'INV-2026-04-001',
		status: 'Paid',
		dueDate: '14 Apr 2026'
	},
	{
		id: 'GGR-1002',
		whitelabel: 'Goa247',
		period: 'Apr 2026',
		gcr: '10.8L',
		rate: '18%',
		platformFee: '3.4L',
		coinCredit: '₹3.4L',
		netPayable: 'IMPS',
		invoice: 'INV-2026-04-002',
		status: 'Pending',
		dueDate: '18 Apr 2026'
	},
	{
		id: 'GGR-1003',
		whitelabel: 'Ravi master',
		period: 'Apr 2026',
		gcr: '8.6L',
		rate: '20%',
		platformFee: '2.2L',
		coinCredit: '₹2.2L',
		netPayable: 'IMPS',
		invoice: 'INV-2026-04-003',
		status: 'Overdue',
		dueDate: '20 Apr 2026'
	}
];

const statusClassMap: Record<WhitelabelOverviewRowType['status'], string> = {
	Active: 'bg-emerald-100 text-emerald-700',
	Paused: 'bg-slate-100 text-slate-700'
};

const billingStatusClassMap: Record<GgrBillingRowType['status'], string> = {
	Paid: 'bg-emerald-100 text-emerald-700',
	Pending: 'bg-amber-100 text-amber-700',
	Overdue: 'bg-red-100 text-red-700'
};

function WhitelabelCoinManagementTable({ activeTab }: WhitelabelCoinManagementTableProps) {
	const [selectedWhitelabel, setSelectedWhitelabel] = useState<string | null>(null);

	const overviewColumns = useMemo<MRT_ColumnDef<WhitelabelOverviewRowType>[]>(
		() => [
			{
				accessorKey: 'whitelabel',
				header: 'Whitelabel',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.whitelabel}</span>
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
				accessorKey: 'coinBal',
				header: 'Coin Bal',
				Cell: ({ row }) => (
					<span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
						{row.original.coinBal}
					</span>
				)
			},
			{ accessorKey: 'loaded', header: 'Loaded(LT)' },
			{ accessorKey: 'consumed', header: 'Consumed' },
			{ accessorKey: 'agents', header: 'Agents' },
			{ accessorKey: 'players', header: 'Players' },
			{ accessorKey: 'mtd', header: 'MTD' },
			{ accessorKey: 'ggr', header: 'GGR' },
			{ accessorKey: 'rate', header: 'Rate' },
			{ accessorKey: 'fee', header: 'Fee' },
			{ accessorKey: 'ow', header: 'Ow' }
		],
		[]
	);

	const coinTransferColumns = useMemo<MRT_ColumnDef<CoinTransferRowType>[]>(
		() => [
			{ accessorKey: 'txnId', header: 'Txn ID' },
			{ accessorKey: 'date', header: 'Date' },
			{
				accessorKey: 'type',
				header: 'Type',
				Cell: ({ row }) => (
					<span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
						{row.original.type}
					</span>
				)
			},
			{ accessorKey: 'whitelabel', header: 'Whitelabel' },
			{ accessorKey: 'coins', header: 'Coins' },
			{ accessorKey: 'amountPaid', header: 'Amount Paid' },
			{ accessorKey: 'payment', header: 'Payment' },
			{ accessorKey: 'referenceNote', header: 'Reference/note' },
			{ accessorKey: 'by', header: 'By' }
		],
		[]
	);

	const ggrBillingColumns = useMemo<MRT_ColumnDef<GgrBillingRowType>[]>(
		() => [
			{
				accessorKey: 'whitelabel',
				header: 'Whitelabel',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.whitelabel}</span>
			},
			{ accessorKey: 'period', header: 'Period' },
			{ accessorKey: 'gcr', header: 'GCR' },
			{ accessorKey: 'rate', header: 'Rate' },
			{ accessorKey: 'platformFee', header: 'Platform Fee' },
			{ accessorKey: 'coinCredit', header: 'Coin Credit' },
			{ accessorKey: 'netPayable', header: 'Net Payable' },
			{ accessorKey: 'invoice', header: 'Invoice#' },
			{
				accessorKey: 'status',
				header: 'Status',
				Cell: ({ row }) => (
					<span
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold ${billingStatusClassMap[row.original.status]}`}
					>
						{row.original.status}
					</span>
				)
			},
			{ accessorKey: 'dueDate', header: 'Due Date' }
		],
		[]
	);

	const tableProps = {
		muiSearchTextFieldProps: {
			placeholder: 'Search...',
			sx: {
				minWidth: '300px'
			}
		},
		enableRowSelection: false,
		enableExpanding: false,
		enableRowNumbers: false,
		renderRowActionMenuItems: () => []
	};

	const loadCoinPopup = (
		<Dialog
			open={Boolean(selectedWhitelabel)}
			onClose={() => setSelectedWhitelabel(null)}
			maxWidth={false}
			slotProps={{
				paper: {
					className:
						'm-0 ml-auto h-full max-h-none w-full max-w-[405px] overflow-hidden rounded-none bg-white shadow-2xl'
				}
			}}
		>
			<div className="flex h-full flex-col bg-white">
				<div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
					<Typography className="text-[13px] font-[Geist] font-semibold text-[#1F232B]">Load coins to whitelabel</Typography>
					<IconButton
						onClick={() => setSelectedWhitelabel(null)}
						size="small"
						aria-label="Close load coin popup"
						className="h-5 w-5 bg-slate-200 p-0 text-slate-400 hover:bg-slate-300 hover:text-slate-600"
					>
						<FuseSvgIcon size={12}>lucide:x</FuseSvgIcon>
					</IconButton>
				</div>

				<div className="flex-1 px-5 py-4">
					<div className="space-y-4">
						<div>
							<Typography className="mb-1.5 text-[12px] font-[Geist] font-medium text-[#1F232B]">Whitelabel</Typography>
							<TextField
								fullWidth
								size="small"
								value={selectedWhitelabel ?? ''}
								placeholder="WI-001 Betking India"
								slotProps={{
									input: {
										readOnly: true,
										className: 'text-[12px]'
									}
								}}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<div>
								<Typography className="mb-1.5 text-[12px] font-[Geist] font-medium text-[#1F232B]">
									Coin Amount
								</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue="50000"
									slotProps={{ input: { className: 'text-[12px] height-[15px]' } }}
								/>
							</div>
							<div>
								<Typography className="mb-1.5 text-[12px] font-[Geist] font-medium text-[#1F232B]">
									Rate (per coin)
								</Typography>
								<TextField
									fullWidth
									size="medium"
									defaultValue="1.00"
									slotProps={{ input: { className: 'text-[12px]' } }}
								/>
							</div>
						</div>

						<div>
							<Typography className="mb-1.5 text-[12px] font-[Geist] font-medium text-[#1F232B]">
								Payment recieved via
							</Typography>
							<TextField
								fullWidth
								size="small"
								defaultValue="Bank Transfer(IMPS/NEFT)"
								slotProps={{ input: { className: 'text-[12px]' } }}
							/>
						</div>

						<div>
							<Typography className="mb-1.5 text-[12px] font-[Geist] font-medium text-[#1F232B]">
								Payment Reference
							</Typography>
							<TextField
								fullWidth
								size="small"
								placeholder="UTR / transaction ID..."
								slotProps={{ input: { className: 'text-[12px]' } }}
							/>
						</div>

						<div>
							<Typography className="mb-1.5 text-[12px] font-[Geist] font-medium text-[#1F232B]">
								Note
							</Typography>
							<TextField
								fullWidth
								size="small"
								placeholder="Optional"
								slotProps={{ input: { className: 'text-[12px]' } }}
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 border-t border-slate-100 px-5 py-4">
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => setSelectedWhitelabel(null)}
						className="h-9 rounded-md border-blue-500 text-[12px] font-semibold text-slate-700"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setSelectedWhitelabel(null)}
						className="h-9 rounded-md bg-blue-600 text-[12px] font-semibold text-white hover:bg-blue-700"
					>
						Load Coin
					</Button>
				</div>
			</div>
		</Dialog>
	);

	if (activeTab === 'coinTransfer') {
		return (
			<>
				<Paper
					className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
					elevation={0}
				>
					<DataTable
						data={coinTransferRows}
						columns={coinTransferColumns}
						{...tableProps}
						renderRowActions={({ row }) => (
							<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
								<button
									type="button"
									onClick={() => setSelectedWhitelabel(row.original.whitelabel)}
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
				{loadCoinPopup}
			</>
		);
	}

	if (activeTab === 'ggrBilling') {
		return (
			<>
				<Paper
					className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
					elevation={0}
				>
					<DataTable
						data={ggrBillingRows}
						columns={ggrBillingColumns}
						{...tableProps}
						renderRowActions={({ row }) => (
							<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
								<button
									type="button"
									onClick={() => setSelectedWhitelabel(row.original.whitelabel)}
									className="flex items-center gap-1"
									aria-label={`View ${row.original.invoice}`}
								>
									<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
									<span className="text-[11px]">View</span>
								</button>
							</div>
						)}
					/>
				</Paper>
				{loadCoinPopup}
			</>
		);
	}

	return (
		<>
			<Paper
				className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				elevation={0}
			>
				<DataTable
					data={overviewRows}
					columns={overviewColumns}
					{...tableProps}
					renderRowActions={({ row }) => (
						<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
							<button
								type="button"
								onClick={() => setSelectedWhitelabel(row.original.whitelabel)}
								className="flex items-center gap-1"
								aria-label={`View ${row.original.whitelabel}`}
							>
								<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
								<span className="text-[11px]">View</span>
							</button>
						</div>
					)}
				/>
			</Paper>
			{loadCoinPopup}
		</>
	);
}

export default WhitelabelCoinManagementTable;
