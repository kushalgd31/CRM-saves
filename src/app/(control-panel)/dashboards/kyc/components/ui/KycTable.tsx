import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { InputAdornment, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import DataTable from 'src/components/data-table/DataTable';
import { KycStatusType, KycUserRowType } from '../../api/types';
import { useGetKycRows } from '../../api/hooks/useGetKycRows';

const statusOptions: { label: string; value: 'all' | KycStatusType }[] = [
	{ label: 'All Status', value: 'all' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Approved', value: 'approved' },
	{ label: 'Rejected', value: 'rejected' },
	{ label: 'Partial', value: 'partial' }
];

const statusClassMap: Record<KycStatusType, string> = {
	pending: 'bg-amber-100 text-amber-700',
	approved: 'bg-emerald-100 text-emerald-700',
	rejected: 'bg-rose-100 text-rose-700',
	partial: 'bg-orange-100 text-orange-700'
};

function KycTable() {
	const { data: rows, isLoading } = useGetKycRows();
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | KycStatusType>('all');

	const filteredRows = useMemo(() => {
		if (!rows) {
			return [];
		}

		return rows.filter((row) => {
			const matchesSearch =
				`${row.name} ${row.email} ${row.phone}`.toLowerCase().includes(search.toLowerCase()) ||
				row.id.toLowerCase().includes(search.toLowerCase());
			const matchesStatus = statusFilter === 'all' || row.overallStatus === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [rows, search, statusFilter]);

	const columns = useMemo<MRT_ColumnDef<KycUserRowType>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'USER DETAILS',
				size: 290,
				enableSorting: false,
				muiTableHeadCellProps: {
					align: 'left'
				},
				muiTableBodyCellProps: {
					align: 'left'
				},
				Cell: ({ row }) => (
					<div className="py-1">
						<Typography className="text-[14px] font-semibold text-slate-900">{row.original.name}</Typography>
						<Typography className="text-[12px] text-slate-500">{row.original.email}</Typography>
						<Typography className="text-[12px] text-slate-500">{row.original.phone}</Typography>
					</div>
				)
			},
			{
				accessorKey: 'panCard',
				header: 'PAN CARD',
				enableSorting: false,
				Cell: ({ cell }) => (
					<span
						className={`inline-flex rounded-full px-3 py-1 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
					>
						{cell.getValue<KycStatusType>()}
					</span>
				)
			},
			{
				accessorKey: 'idProof',
				header: 'ID PROOF',
				enableSorting: false,
				Cell: ({ cell }) => (
					<span
						className={`inline-flex rounded-full px-3 py-1 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
					>
						{cell.getValue<KycStatusType>()}
					</span>
				)
			},
			{
				accessorKey: 'selfie',
				header: 'SELFIE',
				enableSorting: false,
				Cell: ({ cell }) => (
					<span
						className={`inline-flex rounded-full px-3 py-1 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
					>
						{cell.getValue<KycStatusType>()}
					</span>
				)
			},
			{
				accessorKey: 'bankAccount',
				header: 'BANK ACCOUNT',
				enableSorting: false,
				Cell: ({ cell }) => (
					<span
						className={`inline-flex rounded-full px-3 py-1 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
					>
						{cell.getValue<KycStatusType>()}
					</span>
				)
			},
			{
				accessorKey: 'overallStatus',
				header: 'OVERALL STATUS',
				enableSorting: false,
				Cell: ({ cell }) => (
					<span
						className={`inline-flex rounded-full px-3 py-1 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
					>
						{cell.getValue<KycStatusType>()}
					</span>
				)
			},
			{
				id: 'actions',
				header: 'ACTIONS',
				enableSorting: false,
				size: 130,
				Cell: ({ row }) => (
					<div className="flex items-center justify-center gap-2 border-l border-slate-200 pl-4">
						<button
							type="button"
							className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-white shadow-sm"
							aria-label={`Reject ${row.original.name}`}
						>
							<FuseSvgIcon size={12}>lucide:x</FuseSvgIcon>
						</button>
						<button
							type="button"
							className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm"
							aria-label={`Approve ${row.original.name}`}
						>
							<FuseSvgIcon size={12}>lucide:check</FuseSvgIcon>
						</button>
					</div>
				)
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="space-y-6">
			<Paper
				className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-none"
				elevation={0}
			>
				<div className="flex flex-col gap-3 md:flex-row">
					<TextField
						fullWidth
						size="small"
						placeholder="Search by name, email, PAN, or ID number..."
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FuseSvgIcon className="text-slate-400">lucide:search</FuseSvgIcon>
								</InputAdornment>
							)
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								height: 46,
								borderRadius: '14px',
								backgroundColor: '#ffffff'
							},
							'& .MuiInputBase-input': {
								fontSize: 14
							}
						}}
					/>
					<Select
						size="small"
						value={statusFilter}
						onChange={(event) => setStatusFilter(event.target.value as 'all' | KycStatusType)}
						className="min-w-[140px]"
						sx={{
							height: 46,
							borderRadius: '14px',
							fontSize: 14
						}}
					>
						{statusOptions.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</div>
			</Paper>

			<Paper
				className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-none"
				elevation={0}
			>
				<DataTable
					data={filteredRows}
					columns={columns}
					enableColumnActions={false}
					enableColumnFilters={false}
					enableRowActions={false}
					enableRowSelection={false}
					enableDensityToggle={false}
					enableGlobalFilter={false}
					enableTopToolbar={false}
					enableBottomToolbar={false}
					enablePagination={false}
					enableSorting={false}
					muiTableContainerProps={{
						className: 'flex-auto overflow-x-auto'
					}}
					muiTablePaperProps={{
						elevation: 0,
						square: true,
						className: 'flex h-full flex-col flex-auto'
					}}
					muiTableHeadCellProps={({ column }) => ({
						align: column.id === 'name' ? 'left' : 'center',
						sx: {
							py: 2.2,
							fontSize: 12,
							fontWeight: 700,
							color: '#7c8799',
							backgroundColor: '#ffffff',
							borderBottom: '1px solid #e5e7eb',
							letterSpacing: '0.06em',
							borderLeft: column.id === 'actions' ? '1px solid #e2e8f0' : undefined,
							'& .Mui-TableHeadCell-Content-Actions': {
								display: 'none'
							},
							'& .MuiButtonBase-root[aria-label=\"Show/Hide columns\"]': {
								display: 'none'
							},
							'& .MuiButtonBase-root[aria-label=\"Drag\"]': {
								display: 'none'
							}
						}
					})}
					muiTableBodyCellProps={({ column }) => ({
						align: column.id === 'name' ? 'left' : 'center',
						sx: {
							py: 2,
							fontSize: 13,
							borderBottom: '1px solid #eceff3',
							borderLeft: column.id === 'actions' ? '1px solid #e2e8f0' : undefined
						}
					})}
					muiTableBodyRowProps={{
						hover: false,
						sx: {
							backgroundColor: '#ffffff'
						}
					}}
					enableColumnOrdering={false}
					enableGrouping={false}
					enableColumnPinning={false}
				/>
			</Paper>
		</div>
	);
}

export default KycTable;
