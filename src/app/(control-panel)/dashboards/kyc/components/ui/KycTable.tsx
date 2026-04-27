import { useEffect, useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Button, InputAdornment, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import DataTable from 'src/components/data-table/DataTable';
import VerifyCard from './VerifyCard';
import { KycStatusType, KycUserRowType } from '../../api/types';
import { useGetKycRows } from '../../api/hooks/useGetKycRows';
import { createPortal } from 'react-dom';




const statusOptions: { label: string; value: 'all' | KycStatusType }[] = [
	{ label: 'All Status', value: 'all' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Approved', value: 'approved' },
	{ label: 'Rejected', value: 'rejected' },
];

const statusClassMap: Record<KycStatusType, string> = {
	pending: 'bg-amber-200 text-amber-700',
	approved: 'bg-emerald-200 text-emerald-700',
	rejected: 'bg-linear-to-b from-ffffff to-rose-300 text-rose-700',
};

function KycTable() {
	const { data: rows, isLoading } = useGetKycRows();
	const [localRows, setLocalRows] = useState<KycUserRowType[] | null>(null);
	const [nameFilter, setNameFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | KycStatusType>('all');
	const [dateFilter, setDateFilter] = useState('');
	const [selectedRow, setSelectedRow] = useState<KycUserRowType | null>(null);
	const [showDrawer, setShowDrawer] = useState(false);

	useEffect(() => {
		if (rows && localRows === null) {
			setLocalRows(rows);
		}
	}, [rows, localRows]);

	const computeOverallStatus = (row: KycUserRowType): KycStatusType => {
		const values = [row.panCard, row.idProof, row.selfie, row.bankAccount];
		if (values.includes('rejected')) return 'rejected';
		if (values.includes('pending')) return 'pending';
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
					return { ...updatedRow, overallStatus: computeOverallStatus(updatedRow) };
				})
				: prevRows
		);
		setSelectedRow((prev) => {
			if (!prev || prev.id !== rowId) {
				return prev;
			}

			const updatedRow = { ...prev, [field]: value } as KycUserRowType;
			return { ...updatedRow, overallStatus: computeOverallStatus(updatedRow) };
		});
	};

	const filteredRows = useMemo(() => {
		if (!localRows) {
			return [];
		}

		return localRows.filter((row) => {
			const matchesName = nameFilter.trim() === '' || row.name.toLowerCase().includes(nameFilter.toLowerCase());
			const matchesStatus = statusFilter === 'all' || row.overallStatus === statusFilter;
			const matchesDate = dateFilter.trim() === '' || row.date === dateFilter;
			return matchesName && matchesStatus && matchesDate;
		});
	}, [localRows, nameFilter, statusFilter, dateFilter]);

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
						className={`inline-flex rounded-full px-3 py-2 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
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
						className={`inline-flex rounded-full px-3 py-2 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
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
						className={`inline-flex rounded-full px-3 py-2 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
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
						className={`inline-flex rounded-full px-3 py-2 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
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
						className={`inline-flex rounded-full px-3 py-2 text-[12px] leading-none font-semibold capitalize ${statusClassMap[cell.getValue<KycStatusType>()]}`}
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
					<div className="flex items-center justify-center gap-2 pl-4">
						<Button
							size="small"
							variant="text"
							startIcon={<FuseSvgIcon>lucide:eye</FuseSvgIcon>}
							onClick={() => {
							setSelectedRow(row.original);
							setShowDrawer(true);
							}}
						>
							Review
						</Button>
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
				<div className="flex flex-col gap-5 md:flex-row">
					<div className='flex flex-col'>
					<Typography className="text-lg font-semibold text-slate-900 ml-2">User</Typography>
					<TextField
						w-30
						size="small"
						placeholder="Search user"
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
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
								borderRadius: '5px',
								backgroundColor: '#ffffff'
							},
							'& .MuiInputBase-input': {
								fontSize: 14
							}
						}}
					/></div>
					<div className='flex flex-col'>
					<Typography className="text-lg font-semibold text-slate-900 ml-2">Status</Typography>
					<Select
						size="small"
						value={statusFilter}
						onChange={(event) => setStatusFilter(event.target.value as 'all' | KycStatusType)}
						className="min-w-[140px] w-50"
						sx={{
							height: 46,
							borderRadius: '5px',
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
					</Select></div>
					<div className='flex flex-col'>
					<Typography className="text-lg font-semibold text-slate-900 ml-2">Date</Typography>
					<TextField
						w-30
						size="small"
						type="date"
						value={dateFilter}
						onChange={(event) => setDateFilter(event.target.value)}
						InputLabelProps={{
							shrink: true
						}}
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
								borderRadius: '5px',
								backgroundColor: '#ffffff'
							},
							'& .MuiInputBase-input': {
								fontSize: 14
							}
						}}
					/></div>
					<div className='flex gap-5 items-end ml-10'>
					<Button
						size='medium'
						variant='outlined'
						sx={{height: 15}}
						onClick={() => {
							setNameFilter('');
							setStatusFilter('all');
							setDateFilter('');
							setSelectedRow(null);
							setShowDrawer(false);
						}}
					>
						Reset Filter
					</Button>
					<Button size='medium' variant='contained' sx={{height: 15, width: 100}}>Search</Button>
					</div>
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
					...(column.id === 'actions' ? {
						position: 'sticky',
						right: 0,
						zIndex: 4,
						backgroundColor: '#ffffff'
					} : {}),
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
							borderLeft: column.id === 'actions' ? '1px solid #e2e8f0' : undefined,
							...(column.id === 'actions' ? {
								position: 'sticky',
								right: 0,
								zIndex: 3,
								backgroundColor: '#ffffff'
							} : {}),
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
			{showDrawer && selectedRow &&
  createPortal(
    <div
      className="fixed inset-0 z-[9999] flex"
      onClick={() => {
        setShowDrawer(false);
        setSelectedRow(null);
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Drawer */}
      <div
        className="ml-auto w-[500px] h-full bg-white shadow-xl z-10 overflow-y-auto animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
		  <div>
          <h2 className="text-xl font-bold">{selectedRow.name}-KYC Documents</h2>
		  <p className='text-slate-400'>Submitted on {selectedRow.date} | {selectedRow.time} | User ID:{selectedRow.id}</p>
		  </div>
          <button
            onClick={() => {
              setShowDrawer(false);
              setSelectedRow(null);
            }}
            className='cursor-pointer'
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">

          {/* User Info */}
		  <div>
		  <p className="text-lg font-semibold text-gray-500">User Information</p>
          <div className="border rounded p-3 bg-[#F5F5F5] flex">
			<div className='flex flex-col border-l px-2'>
			<p className='text-slate-400'>Email:</p>
            <p className="font-semibold">{selectedRow.email}</p>
			</div>
			<div className='flex flex-col border-l px-2'>
			<p className='text-slate-400'>Phone</p>
            <p className="font-semibold">{selectedRow.phone}</p>
			</div>
			<div className='flex flex-col border-l px-2'>
				<p className='text-slate-400'>Overall Status</p>
				<span className={`inline-flex font-semibold capitalize`}>
                  <div className={`px-1 rounded-full  ${statusClassMap[selectedRow.overallStatus]} mr-2`}></div> {selectedRow.overallStatus}
                </span>
			</div>
          </div>
		  </div>

          {/* Section Cards */}
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
    </div>,
    document.body
  )}
		</div>
		
	);
}

export default KycTable;
