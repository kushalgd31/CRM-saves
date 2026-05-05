import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';
import VerifyCard from './VerifyCard';
import { PlayerCommissionMetricKey, PlayerCommissionRowType, PlayerCommissionStatusType } from '../../api/types';
import { useGetPlayerCommissionRows } from '../../api/hooks/useGetPlayerCommissionRows';

const statusClassMap: Record<PlayerCommissionStatusType, string> = {
	pending: 'bg-amber-500',
	approved: 'bg-emerald-500',
	rejected: 'bg-red-500'
};

const statusTextClassMap: Record<PlayerCommissionStatusType, string> = {
	pending: 'bg-amber-100 text-amber-700',
	approved: 'bg-emerald-100 text-emerald-700',
	rejected: 'bg-red-100 text-red-700'
};

const formatStatusLabel = (status: PlayerCommissionStatusType) => status.charAt(0).toUpperCase() + status.slice(1);

const commissionFields: PlayerCommissionMetricKey[] = ['sportsbook', 'casino', 'slots', 'liveCasino'];

function PlayerCommissionTable() {
	const { data: rows, isLoading } = useGetPlayerCommissionRows();
	const [localRows, setLocalRows] = useState<PlayerCommissionRowType[] | null>(null);
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

	useEffect(() => {
		if (rows && localRows === null) {
			setLocalRows(rows);
		}
	}, [rows, localRows]);

	const safeRows = localRows ?? rows ?? [];
	const selectedRow = safeRows.find((row) => row.id === selectedRowId) ?? null;

	const computeOverallStatus = (row: PlayerCommissionRowType): PlayerCommissionStatusType => {
		const values = commissionFields.map((field) => row[field]);

		if (values.includes('rejected')) {
			return 'rejected';
		}

		if (values.includes('pending')) {
			return 'pending';
		}

		return 'approved';
	};

	const updateRowStatus = (rowId: string, field: PlayerCommissionMetricKey, value: PlayerCommissionStatusType) => {
		setLocalRows((prevRows) =>
			prevRows
				? prevRows.map((row) => {
						if (row.id !== rowId) {
							return row;
						}

						const updatedRow = { ...row, [field]: value } as PlayerCommissionRowType;
						return {
							...updatedRow,
							overallStatus: computeOverallStatus(updatedRow)
						};
					})
				: prevRows
		);
	};

	const columns = useMemo<MRT_ColumnDef<PlayerCommissionRowType>[]>(
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
				accessorKey: 'name',
				header: 'Username',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.name}</span>
			},
			{
				accessorKey: 'email',
				header: 'Email',
				Cell: ({ row }) => <span className="font-semibold text-slate-600">{row.original.email}</span>
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
				Cell: ({ row }) => <span className="font-semibold text-slate-600">{row.original.phone}</span>
			},
			{
				accessorKey: 'sportsbook',
				header: 'Sportsbook',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.sportsbook]}`}
					>
						{formatStatusLabel(row.original.sportsbook)}
					</div>
				)
			},
			{
				accessorKey: 'casino',
				header: 'Casino',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.casino]}`}
					>
						{formatStatusLabel(row.original.casino)}
					</div>
				)
			},
			{
				accessorKey: 'slots',
				header: 'Slots',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.slots]}`}
					>
						{formatStatusLabel(row.original.slots)}
					</div>
				)
			},
			{
				accessorKey: 'liveCasino',
				header: 'Live Casino',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.liveCasino]}`}
					>
						{formatStatusLabel(row.original.liveCasino)}
					</div>
				)
			},
			{
				accessorKey: 'overallStatus',
				header: 'Overall Status',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.overallStatus]}`}
					>
						{formatStatusLabel(row.original.overallStatus)}
					</div>
				)
			},
			{
				accessorKey: 'date',
				header: 'Date'
			},
			{
				accessorKey: 'time',
				header: 'Time'
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!safeRows.length && !rows) {
		return null;
	}

	return (
		<>
			<Paper
				className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				elevation={0}
			>
				<DataTable
					data={safeRows}
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
						<div className="flex cursor-pointer items-center justify-center gap-1 font-semibold text-slate-600 hover:text-slate-900">
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
										{selectedRow.name}
									</Typography>
									<Typography className="mt-0.5 text-[13px] font-medium text-slate-400">
										#{selectedRow.id}
									</Typography>
								</div>
								<IconButton
									onClick={() => setSelectedRowId(null)}
									className="border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-700"
									size="small"
									aria-label="Close details popup"
								>
									<FuseSvgIcon size={16}>lucide:x</FuseSvgIcon>
								</IconButton>
							</div>
						</div>

						<div className="flex-1 space-y-6 overflow-y-auto px-6 py-6 pb-24">
							<div className="rounded-2xl border border-slate-200 bg-white">
								<div className="border-b border-slate-100 px-5 py-4">
									<Typography className="text-[15px] font-bold text-slate-900">
										User Details
									</Typography>
								</div>
								<div className="px-5 py-2">
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Full Name
										</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">
											{selectedRow.name}
										</Typography>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Email
										</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">
											{selectedRow.email}
										</Typography>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Phone No.
										</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">
											{selectedRow.phone}
										</Typography>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Overall Status
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.overallStatus]}`}
										>
											{formatStatusLabel(selectedRow.overallStatus)}
										</span>
									</div>
								</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white">
								<div className="border-b border-slate-100 px-5 py-4">
									<Typography className="text-[15px] font-bold text-slate-900">
										Commission Details
									</Typography>
								</div>
								<div className="px-5 py-2">
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Submitted Date
										</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">
											{selectedRow.date}
										</Typography>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Submitted Time
										</Typography>
										<Typography className="text-[13px] font-bold text-slate-900">
											{selectedRow.time}
										</Typography>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Sportsbook
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.sportsbook]}`}
										>
											{formatStatusLabel(selectedRow.sportsbook)}
										</span>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Casino
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.casino]}`}
										>
											{formatStatusLabel(selectedRow.casino)}
										</span>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Slots
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.slots]}`}
										>
											{formatStatusLabel(selectedRow.slots)}
										</span>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Live Casino
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.liveCasino]}`}
										>
											{formatStatusLabel(selectedRow.liveCasino)}
										</span>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<VerifyCard
									title="Sportsbook Commission"
									status={selectedRow.sportsbook}
									images={selectedRow.sportsbookImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'sportsbook', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'sportsbook', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'sportsbook', 'pending')}
								/>
								<VerifyCard
									title="Casino Commission"
									status={selectedRow.casino}
									images={selectedRow.casinoImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'casino', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'casino', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'casino', 'pending')}
								/>
								<VerifyCard
									title="Slots Commission"
									status={selectedRow.slots}
									images={selectedRow.slotsImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'slots', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'slots', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'slots', 'pending')}
								/>
								<VerifyCard
									title="Live Casino Commission"
									status={selectedRow.liveCasino}
									images={selectedRow.liveCasinoImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'liveCasino', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'liveCasino', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'liveCasino', 'pending')}
								/>
							</div>
						</div>
					</div>
				)}
			</Dialog>
		</>
	);
}

export default PlayerCommissionTable;
