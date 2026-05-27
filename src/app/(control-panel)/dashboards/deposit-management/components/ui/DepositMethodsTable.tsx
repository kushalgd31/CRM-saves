import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { type MRT_ColumnDef } from 'material-react-table';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import DataTable from 'src/components/data-table/DataTable';
import { DepositMethod } from '../types';

type DepositMethodsTableProps = {
	rows: DepositMethod[];
	onEditMethod: (method: DepositMethod) => void;
	title?: string;
	subtitle?: string;
	successHeader?: string;
};

const switchSx = {
	height: 20,
	padding: 0,
	width: 36,
	'& .MuiSwitch-switchBase': {
		padding: '2px',
		'&.Mui-checked': {
			transform: 'translateX(16px)'
		}
	},
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#ffffff'
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#020617',
		opacity: 1
	},
	'& .MuiSwitch-thumb': {
		boxShadow: 'none',
		color: '#ffffff',
		height: 16,
		width: 16
	},
	'& .MuiSwitch-track': {
		backgroundColor: '#d1d5db',
		borderRadius: 999,
		opacity: 1
	}
};

function Badge({ children, className }: { children: ReactNode; className: string }) {
	return (
		<span
			className={`inline-flex rounded-full px-2 py-1 font-['Geist'] text-[10px] leading-3 font-semibold ${className}`}
		>
			{children}
		</span>
	);
}

function DepositMethodsTable({
	rows,
	onEditMethod,
	title = 'Payment Methods',
	subtitle = 'Manage payment gateways and manual deposit methods',
	successHeader = 'SUCCESS/FAILURE'
}: DepositMethodsTableProps) {
	const [enabledById, setEnabledById] = useState<Record<string, boolean>>({});

	useEffect(() => {
		setEnabledById(Object.fromEntries(rows.map((row) => [row.id, row.enabled])));
	}, [rows]);

	const columns = useMemo<MRT_ColumnDef<DepositMethod>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'METHOD',
				size: 190,
				Cell: ({ row }) => (
					<div className="flex items-center gap-3">
						<span
							className={`flex h-8 w-8 items-center justify-center rounded-lg ${row.original.iconClass}`}
						>
							<FuseSvgIcon size={17}>{row.original.icon}</FuseSvgIcon>
						</span>
						<div>
							<Typography className="font-['Geist'] text-[13px] leading-4 font-bold text-[#101828]">
								{row.original.name}
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[10px] leading-3 text-[#4A5565]">
								{row.original.provider}
							</Typography>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'type',
				header: 'TYPE',
				size: 90,
				Cell: ({ row }) => (
					<Badge
						className={
							row.original.type === 'Gateway' || row.original.type === 'Auto'
								? 'bg-[#dbeafe] text-[#155dfc]'
								: 'bg-[#f3e8ff] text-[#9810fa]'
						}
					>
						{row.original.typeLabel ?? row.original.type}
					</Badge>
				)
			},
			{
				accessorKey: 'success',
				header: successHeader,
				size: 145,
				Cell: ({ row }) => {
					const pending = row.original.pending ?? 0;
					const total = row.original.success + row.original.failure + pending;
					const successWidth = Math.max(12, Math.round((row.original.success / total) * 100));
					const failureWidth = Math.max(
						row.original.failure > 0 ? 3 : 0,
						Math.round((row.original.failure / total) * 100)
					);
					const pendingWidth = pending > 0 ? Math.max(3, 100 - successWidth - failureWidth) : 0;

					return (
						<div>
							<div className="flex h-7 w-[104px] overflow-hidden rounded-md bg-[#fff7ed]">
								<div
									className="h-full bg-[#00c950]"
									style={{ width: `${successWidth}%` }}
								/>
								<div
									className="h-full bg-[#fb2c36]"
									style={{ width: `${failureWidth}%` }}
								/>
								{pending > 0 && (
									<div
										className="h-full bg-[#ff4f0f]"
										style={{ width: `${pendingWidth}%` }}
									/>
								)}
							</div>
							<div className="mt-2 flex w-[116px] items-start justify-between text-[10px] leading-3">
								<span className="flex items-center gap-0.5 font-['Geist'] text-[#00a63e]">
									<FuseSvgIcon size={9}>lucide:trending-up</FuseSvgIcon>
									{row.original.success}
								</span>
								<span className="flex items-center gap-0.5 font-['Geist'] text-[#fb2c36]">
									<FuseSvgIcon size={9}>lucide:trending-down</FuseSvgIcon>
									{row.original.failure}
								</span>
								{pending > 0 ? (
									<span className="flex items-center gap-0.5 font-['Geist'] text-[#ff4f0f]">
										<FuseSvgIcon size={9}>lucide:clock-3</FuseSvgIcon>
										{pending}
									</span>
								) : (
									<span className="text-center font-['Geist'] text-[#667085]">
										{total}
										<br />
										total
									</span>
								)}
							</div>
						</div>
					);
				}
			},
			{
				accessorKey: 'successRate',
				header: 'SUCCESS RATE',
				size: 90,
				Cell: ({ row }) => {
					const lowRate = Number(row.original.successRate.replace('%', '')) < 90;

					return (
						<div>
							<Typography
								className={`font-['Geist'] text-[12px] leading-4 font-bold ${
									lowRate ? 'text-[#fb2c36]' : 'text-[#00a63e]'
								}`}
							>
								{row.original.successRate}
							</Typography>
							<div
								className={`mt-1 h-1.5 w-[55px] rounded-full ${lowRate ? 'bg-[#fb2c36]' : 'bg-[#00a63e]'}`}
							/>
						</div>
					);
				}
			},
			{
				accessorKey: 'totalAmount',
				header: 'TOTAL AMOUNT',
				size: 125,
				Cell: ({ row }) => (
					<div>
						<Typography className="font-['Geist'] text-[13px] leading-4 font-bold text-[#101828]">
							{row.original.totalAmount}
						</Typography>
						<Typography className="mt-1 font-['Geist'] text-[10px] leading-3 text-[#4A5565]">
							{row.original.fee}
						</Typography>
					</div>
				)
			},
			{
				accessorKey: 'lastActiveDate',
				header: 'LAST ACTIVE',
				size: 95,
				Cell: ({ row }) => (
					<div>
						<Typography className="font-['Geist'] text-[11px] leading-4 text-[#101828]">
							{row.original.lastActiveDate}
						</Typography>
						<Typography className="flex items-center gap-1 font-['Geist'] text-[10px] leading-3 text-[#4A5565]">
							<FuseSvgIcon size={9}>lucide:clock-3</FuseSvgIcon>
							{row.original.lastActiveTime}
						</Typography>
					</div>
				)
			},
			{
				accessorKey: 'availability',
				header: 'AVAILABILITY',
				size: 105,
				Cell: ({ row }) => (
					<div className="flex flex-col items-start gap-1">
						{row.original.availability.map((item) => (
							<Badge
								key={item}
								className={
									item === 'All'
										? 'bg-[#dcfce7] text-[#00a63e]'
										: item === 'Verified'
											? 'bg-[#dbeafe] text-[#155dfc]'
											: item === 'VIP'
												? 'bg-[#f3e8ff] text-[#9810fa]'
												: item === 'Custom'
													? 'bg-[#ffedd5] text-[#f97316]'
													: 'border border-[#d1d5db] bg-white text-[#101828]'
								}
							>
								{item}
							</Badge>
						))}
					</div>
				)
			},
			{
				accessorKey: 'status',
				header: 'STATUS',
				size: 80,
				Cell: ({ row }) => {
					const isEnabled = enabledById[row.original.id] ?? row.original.enabled;

					return (
						<div className="flex flex-col items-start">
							<Switch
								checked={isEnabled}
								onChange={(event) =>
									setEnabledById((current) => ({
										...current,
										[row.original.id]: event.target.checked
									}))
								}
								sx={switchSx}
							/>
							<Badge
								className={isEnabled ? 'bg-[#dcfce7] text-[#00a63e]' : 'bg-[#f1f5f9] text-[#4A5565]'}
							>
								{isEnabled ? 'Active' : 'Inactive'}
							</Badge>
						</div>
					);
				}
			}
		],
		[enabledById, successHeader]
	);

	return (
		<Paper
			className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-none"
			elevation={0}
		>
			<div className="px-5 pt-5 pb-4">
				<Typography className="font-['Geist'] text-[15px] leading-5 font-semibold text-[#101828]">
					{title}
				</Typography>
				<Typography className="mt-2 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">{subtitle}</Typography>
			</div>
			<div className="px-5 pb-5">
				<DataTable
					data={rows}
					columns={columns}
					enableTopToolbar={false}
					enableBottomToolbar={false}
					enablePagination={false}
					enableRowSelection={false}
					enableExpanding={false}
					enableRowNumbers={false}
					enableColumnActions={false}
					enableColumnFilters={false}
					enableColumnOrdering={false}
					enableGrouping={false}
					enableColumnPinning={false}
					renderRowActionMenuItems={() => []}
					renderRowActions={({ row }) => (
						<div className="flex items-center justify-center pr-1 text-[#155dfc]">
							<button
								type="button"
								onClick={() => onEditMethod(row.original)}
								aria-label={`Edit ${row.original.name}`}
							>
								<FuseSvgIcon size={15}>lucide:square-pen</FuseSvgIcon>
							</button>
						</div>
					)}
					displayColumnDefOptions={{
						'mrt-row-actions': {
							header: 'ACTION',
							size: 60
						}
					}}
					muiTablePaperProps={{
						elevation: 0,
						square: true,
						className: 'flex flex-col flex-auto overflow-hidden rounded-none border-0 shadow-none'
					}}
					muiTableContainerProps={{
						className: 'flex-auto overflow-x-auto'
					}}
					muiTableHeadCellProps={{
						sx: {
							backgroundColor: '#f8fafc',
							borderBottom: '1px solid #eaecf0',
							color: '#344054',
							fontFamily: 'Geist, sans-serif',
							fontSize: 10,
							fontWeight: 700,
							letterSpacing: '0.04em',
							py: 1.8
						}
					}}
					muiTableBodyCellProps={{
						sx: {
							borderBottom: '1px solid #f2f4f7',
							color: '#101828',
							fontFamily: 'Geist, sans-serif',
							fontSize: 12,
							py: 2.1,
							verticalAlign: 'middle'
						}
					}}
					muiTableBodyRowProps={{
						sx: {
							backgroundColor: '#ffffff'
						}
					}}
					initialState={{
						density: 'compact',
						columnPinning: {
							right: ['mrt-row-actions']
						}
					}}
				/>
			</div>
		</Paper>
	);
}

export default DepositMethodsTable;
