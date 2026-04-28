import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';
import { useGetTransactionsRows } from '../../api/hooks/useGetTransactionsRows';
import { TransactionsRowType } from '../../api/types';
import { MRT_TableInstance } from 'material-react-table';

function TransactionsTable() {
	const { data: transactionsRows, isLoading } = useGetTransactionsRows();
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
	const safeRows = transactionsRows ?? [];

	const selectedRow = safeRows.find((row) => row.id === selectedRowId) ?? null;

	const columns = useMemo<MRT_ColumnDef<TransactionsRowType>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				Cell: ({ row }) => (
					<button
						type="button"
						onClick={() => setSelectedRowId(row.original.id)}
						className="text-primary-600 font-semibold hover:underline"
					>
						{row.original.id}
					</button>
				)
			},
			{
				accessorKey: 'username',
				header: 'Username'
			},
			{
				accessorKey: 'type',
				header: 'Type'
			},
			{
				accessorKey: 'subType',
				header: 'Sub type'
			},
			{
				accessorKey: 'stake',
				header: 'Stake'
			},
			{
				accessorKey: 'amount',
				header: 'Amount'
			},
			{
				accessorKey: 'result',
				header: 'Result'
			},
			{
				accessorKey: 'winLoose',
				header: 'Win/Loose'
			},
			{
				accessorKey: 'runningBalance',
				header: 'Running Balance'
			},
			{
				accessorKey: 'createdAt',
				header: 'Created at'
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!transactionsRows) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4">
			<Paper className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" elevation={0}>
				<DataTable
					data={transactionsRows}
					columns={columns}
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
								onClick={() => setSelectedRowId(row.original.id)}
								className="flex items-center gap-1"
							>
								<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
								<span>View</span>
							</button>
						</div>
					)}
				/>
			</Paper>

			<Dialog
				open={Boolean(selectedRow)}
				onClose={() => setSelectedRowId(null)}
				maxWidth={false}
				slotProps={{
					paper: {
						className:
							'm-0 ml-auto h-full max-h-none w-full max-w-[560px] overflow-hidden rounded-l-[28px] rounded-r-none shadow-2xl'
					}
				}}
			>
				{selectedRow && (
					<div className="flex h-full flex-col bg-white">
						<div className="border-b border-slate-200">
							<div className="flex items-start justify-between px-6 py-5">
								<div>
									<Typography className="text-lg font-bold tracking-tight text-slate-900">
										Transaction Details
									</Typography>
									<Typography className="text-[13px] text-slate-400 font-medium mt-0.5">
										#{selectedRow.id}
									</Typography>
								</div>
								<IconButton
									onClick={() => setSelectedRowId(null)}
									className="text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200"
									size="small"
									aria-label="Close details popup"
								>
									<FuseSvgIcon size={16}>lucide:x</FuseSvgIcon>
								</IconButton>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-6">

							{/* User Details */}
							<div className="rounded-2xl border border-slate-200 bg-white">
								<div className="px-5 py-4 border-b border-slate-100">
									<Typography className="text-[15px] font-bold text-slate-900">User Details</Typography>
								</div>
								<div className="px-5 py-2">
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Username</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.username}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Phone No.</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.phoneNo}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">IP</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.ip}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">OS</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.os}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Device</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.device}</Typography>
									</div>
								</div>
							</div>

							{/* Balances */}
							<div className="flex gap-4">
								<div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5">
									<Typography className="text-[14px] font-bold text-slate-900 mb-4">Before Balance</Typography>
									<div className="flex gap-4 pb-4 border-b border-slate-100">
										<div className="bg-slate-50 rounded-xl flex-1 p-3 flex flex-col items-center justify-center border border-slate-100/50">
											<Typography className="text-xl font-bold text-slate-900">{selectedRow.beforeBalanceBonus}</Typography>
											<Typography className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Bonus Balance</Typography>
										</div>
										<div className="bg-slate-50 rounded-xl flex-1 p-3 flex flex-col items-center justify-center border border-slate-100/50">
											<Typography className="text-xl font-bold text-slate-900">{selectedRow.beforeBalanceWallet}</Typography>
											<Typography className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Wallet Balance</Typography>
										</div>
									</div>
									<div className="flex justify-between pt-4">
										<Typography className="text-[13px] text-slate-500 font-medium">Currency:</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.currency}</Typography>
									</div>
								</div>

								<div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5">
									<Typography className="text-[14px] font-bold text-slate-900 mb-4">After Balance</Typography>
									<div className="flex gap-4 pb-4 border-b border-slate-100">
										<div className="bg-slate-50 rounded-xl flex-1 p-3 flex flex-col items-center justify-center border border-slate-100/50">
											<Typography className="text-xl font-bold text-slate-900">{selectedRow.afterBalanceBonus}</Typography>
											<Typography className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Bonus Balance</Typography>
										</div>
										<div className="bg-slate-50 rounded-xl flex-1 p-3 flex flex-col items-center justify-center border border-slate-100/50">
											<Typography className="text-emerald-500 text-xl font-bold">{selectedRow.afterBalanceWallet}</Typography>
											<Typography className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Wallet Balance</Typography>
										</div>
									</div>
									<div className="flex justify-between pt-4">
										<Typography className="text-[13px] text-slate-500 font-medium">Currency</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.currency}</Typography>
									</div>
								</div>
							</div>

							{/* Transaction */}
							<div className="rounded-2xl border border-slate-200 bg-white mb-6">
								<div className="px-5 py-4 border-b border-slate-100">
									<Typography className="text-[15px] font-bold text-slate-900">Transaction</Typography>
								</div>
								<div className="px-5 py-2">
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Type</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.type}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Subtype</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.subType}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Bet on</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.betOn}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Timestamp</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.timestamp}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Stake</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.stake}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Amount</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.amount}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Debited from Bonus</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.debitedFromBonus}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Debited from Wallet</Typography>
										{selectedRow.debitedFromWallet === 'View QR' ? (
											<Typography className="text-[13px] font-bold text-blue-600 underline cursor-pointer">{selectedRow.debitedFromWallet}</Typography>
										) : (
											<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.debitedFromWallet}</Typography>
										)}
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Result</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.result}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Credited to Bonus</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.creditedToBonus}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Credited to Wallet</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.creditedToWallet}</Typography>
									</div>
								</div>
							</div>

						</div>

						{/* Bottom Actions */}
						<div className="absolute bottom-0 w-full border-t border-slate-200 bg-white p-5 flex justify-end gap-3 rounded-bl-[28px]">
							<Button variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none', px: 4, fontWeight: 600, borderColor: '#e2e8f0', color: '#64748b' }}>
								Raise Dispute
							</Button>
							<Button onClick={() => setSelectedRowId(null)} variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', px: 6, fontWeight: 600, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}>
								Cancel
							</Button>
						</div>

					</div>
				)}
			</Dialog>
		</div>
	);
}

export default TransactionsTable;
