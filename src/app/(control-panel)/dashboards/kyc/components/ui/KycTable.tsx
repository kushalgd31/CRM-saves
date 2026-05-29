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
import { KycStatusType, KycUserRowType } from '../../api/types';
import { useGetKycRows } from '../../api/hooks/useGetKycRows';

const statusClassMap: Record<KycStatusType, string> = {
	pending: 'bg-amber-500',
	approved: 'bg-emerald-500',
	rejected: 'bg-red-500'
};

const statusTextClassMap: Record<KycStatusType, string> = {
	pending: 'bg-amber-100 text-amber-700',
	approved: 'bg-emerald-100 text-emerald-700',
	rejected: 'bg-red-100 text-red-700'
};

const formatStatusLabel = (status: KycStatusType) => status.charAt(0).toUpperCase() + status.slice(1);

function KycTable() {
	const { data: rows, isLoading } = useGetKycRows();
	const [localRows, setLocalRows] = useState<KycUserRowType[] | null>(null);
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

	useEffect(() => {
		if (rows && localRows === null) {
			setLocalRows(rows);
		}
	}, [rows, localRows]);

	const safeRows = localRows ?? rows ?? [];
	const selectedRow = safeRows.find((row) => row.id === selectedRowId) ?? null;

	const computeOverallStatus = (row: KycUserRowType): KycStatusType => {
		const values = [row.panCard, row.idProof, row.selfie, row.bankAccount];

		if (values.includes('rejected')) {
			return 'rejected';
		}

		if (values.includes('pending')) {
			return 'pending';
		}

		return 'approved';
	};

	const updateRowStatus = (
		rowId: string,
		field: 'panCard' | 'idProof' | 'selfie' | 'bankAccount',
		value: KycStatusType
	) => {
		setLocalRows((prevRows) =>
			prevRows
				? prevRows.map((row) => {
						if (row.id !== rowId) {
							return row;
						}

						const updatedRow = { ...row, [field]: value } as KycUserRowType;
						return {
							...updatedRow,
							overallStatus: computeOverallStatus(updatedRow)
						};
					})
				: prevRows
		);
	};

	const columns = useMemo<MRT_ColumnDef<KycUserRowType>[]>(
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
				accessorKey: 'panCard',
				header: 'PAN Card',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.panCard]}`}
					>
						{formatStatusLabel(row.original.panCard)}
					</div>
				)
			},
			{
				accessorKey: 'idProof',
				header: 'ID Proof',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.idProof]}`}
					>
						{formatStatusLabel(row.original.idProof)}
					</div>
				)
			},
			{
				accessorKey: 'selfie',
				header: 'Selfie',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.selfie]}`}
					>
						{formatStatusLabel(row.original.selfie)}
					</div>
				)
			},
			{
				accessorKey: 'bankAccount',
				header: 'Bank Account',
				Cell: ({ row }) => (
					<div
						className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold text-white ${statusClassMap[row.original.bankAccount]}`}
					>
						{formatStatusLabel(row.original.bankAccount)}
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
										Submission Details
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
											PAN Card
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.panCard]}`}
										>
											{formatStatusLabel(selectedRow.panCard)}
										</span>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											ID Proof
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.idProof]}`}
										>
											{formatStatusLabel(selectedRow.idProof)}
										</span>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Selfie
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.selfie]}`}
										>
											{formatStatusLabel(selectedRow.selfie)}
										</span>
									</div>
									<div className="flex justify-between border-b border-slate-50 py-3 last:border-b-0">
										<Typography className="text-[13px] font-medium text-slate-500">
											Bank Account
										</Typography>
										<span
											className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusTextClassMap[selectedRow.bankAccount]}`}
										>
											{formatStatusLabel(selectedRow.bankAccount)}
										</span>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<VerifyCard
									title="PAN Card"
									status={selectedRow.panCard}
									images={selectedRow.panCardImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'panCard', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'panCard', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'panCard', 'pending')}
								/>
								<VerifyCard
									title="ID Proof"
									status={selectedRow.idProof}
									images={selectedRow.idProofImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'idProof', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'idProof', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'idProof', 'pending')}
								/>
								<VerifyCard
									title="Selfie"
									status={selectedRow.selfie}
									images={selectedRow.selfieImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'selfie', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'selfie', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'selfie', 'pending')}
								/>
								<VerifyCard
									title="Bank Account"
									status={selectedRow.bankAccount}
									images={selectedRow.bankAccountImages}
									onApprove={() => updateRowStatus(selectedRow.id, 'bankAccount', 'approved')}
									onReject={() => updateRowStatus(selectedRow.id, 'bankAccount', 'rejected')}
									onVerify={() => updateRowStatus(selectedRow.id, 'bankAccount', 'pending')}
								/>
							</div>
						</div>
					</div>
				)}
			</Dialog>
		</>
	);
}

export default KycTable;
