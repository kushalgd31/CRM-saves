import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useGetDepositRows } from '../../api/hooks/useGetDepositRows';
import { DepositRowType } from '../../api/types';

function DepositTable() {
	const { data: depositRows, isLoading } = useGetDepositRows();
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
	const safeRows = depositRows ?? [];

	const selectedRow = safeRows.find((row) => row.id === selectedRowId) ?? null;

	const columns = useMemo<MRT_ColumnDef<DepositRowType>[]>(
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
				header: 'Username',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.username}</span>
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
				Cell: ({ row }) => <span className="font-bold text-slate-900">{row.original.amount}</span>
			},
			{
				accessorKey: 'method',
				header: 'Method',
				Cell: ({ row }) => <span className="font-semibold text-slate-600">{row.original.method}</span>
			},
			{
				accessorKey: 'status',
				header: 'Status',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${
							row.original.status === 'Approved' || row.original.status === 'Complete'
								? 'bg-emerald-500'
								: row.original.status === 'Pending'
									? 'bg-amber-500'
									: 'bg-red-500'
						}`}
					>
						{row.original.status === 'Approved' ? 'Complete' : row.original.status}
					</div>
				)
			},
			{
				accessorKey: 'age',
				header: 'Age'
			},
			{
				accessorKey: 'kyc',
				header: 'KYC',
				Cell: ({ row }) => <span>{row.original.kyc === 'Approved' ? 'Verified' : row.original.kyc}</span>
			},
			{
				accessorKey: 'flags',
				header: 'Flag'
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!depositRows) {
		return null;
	}

	return (
		<>
			<Paper
				className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				elevation={0}
			>
				<DataTable
					data={depositRows}
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
								<span className="text-[11px]">View</span>
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
										{selectedRow.username}
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

							{/* Referral */}
							<div className="rounded-2xl border border-slate-200 bg-white">
								<div className="px-5 py-4 border-b border-slate-100">
									<Typography className="text-[15px] font-bold text-slate-900">Referral</Typography>
								</div>
								<div className="px-5 py-2">
									<div className="flex justify-between py-3">
										<Typography className="text-[13px] text-slate-500 font-medium">Agent Name</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.agentName}</Typography>
									</div>
								</div>
							</div>

							{/* Deposit Details */}
							<div className="rounded-2xl border border-slate-200 bg-white">
								<div className="px-5 py-4 border-b border-slate-100">
									<Typography className="text-[15px] font-bold text-slate-900">Deposit</Typography>
								</div>
								<div className="px-5 py-2">
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Amount</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.amount}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Type</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.method}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">UTR</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.utr}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Risk Percentage</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.riskPercentage}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Time</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.time}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Remark</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">{selectedRow.remark}</Typography>
									</div>
									<div className="flex justify-between py-3 border-b border-slate-50 last:border-b-0">
										<Typography className="text-[13px] text-slate-500 font-medium">Screenshot</Typography>
										<a
											href={selectedRow.screenshotUrl}
											target="_blank"
											rel="noreferrer"
											className="text-emerald-500 text-[13px] font-bold hover:underline cursor-pointer flex items-center gap-1"
										>
											<FuseSvgIcon size={14}>lucide:image</FuseSvgIcon>
											<span>View Screenshot</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Dialog>
		</>
	);
}

export default DepositTable;
