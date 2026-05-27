import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import DataTable from 'src/components/data-table/DataTable';
import { WhitelabelSite } from '../types';
import { splitAppId } from '../utils/splitAppId';

type WhitelabelSitesTableProps = {
	rows: WhitelabelSite[];
	onViewSite: (site: WhitelabelSite) => void;
};

function WhitelabelSitesTable({ rows, onViewSite }: WhitelabelSitesTableProps) {
	const columns = useMemo<MRT_ColumnDef<WhitelabelSite>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'SITE DETAILS',
				size: 210,
				Cell: ({ row }) => (
					<div className="flex gap-2">
						<FuseSvgIcon
							size={16}
							className="mt-0.5 text-[#155dfc]"
						>
							lucide:globe
						</FuseSvgIcon>
						<div>
							<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
								{row.original.name}
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
								SPOC: {row.original.spoc}
							</Typography>
							<Typography className="font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
								Support: {row.original.support}
							</Typography>
							<Typography className="font-['Geist'] text-[11px] leading-4 text-[#155dfc]">
								{row.original.domain}
							</Typography>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'appId',
				header: 'APP ID',
				size: 120,
				Cell: ({ row }) => (
					<div className="flex items-center gap-2">
						<span className="rounded-md bg-[#f2f4f7] px-2 py-2 font-['Geist'] text-[11px] leading-4 text-[#101828]">
							{splitAppId(row.original.appId)}
						</span>
						<FuseSvgIcon
							size={15}
							className="text-[#4A5565]"
						>
							lucide:copy
						</FuseSvgIcon>
					</div>
				)
			},
			{
				accessorKey: 'products',
				header: 'PRODUCTS',
				size: 120,
				Cell: ({ row }) => (
					<div className="flex flex-col items-start gap-1">
						{row.original.products.map((product) => (
							<span
								key={product}
								className="rounded-full border border-[#d0d5dd] bg-white px-2 py-0.5 font-['Geist'] text-[11px] leading-4 text-[#101828]"
							>
								{product}
							</span>
						))}
					</div>
				)
			},
			{
				accessorKey: 'totalPlayers',
				header: 'PLAYERS',
				size: 120,
				Cell: ({ row }) => (
					<div className="flex w-[86px] flex-col gap-3 font-['Geist']">
						<div className="grid grid-cols-[18px_1fr] items-start gap-2">
							<FuseSvgIcon
								size={16}
								className="mt-0.5 text-[#4A5565]"
							>
								lucide:users
							</FuseSvgIcon>
							<div className="text-left">
								<Typography className="font-['Geist'] text-[13px] leading-4 font-bold text-[#101828]">
									{row.original.totalPlayers}
								</Typography>
								<Typography className="font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
									Total
								</Typography>
							</div>
						</div>
						<div className="grid grid-cols-[18px_1fr] items-start gap-2">
							<FuseSvgIcon
								size={16}
								className="mt-0.5 text-[#00a63e]"
							>
								lucide:activity
							</FuseSvgIcon>
							<div className="text-left">
								<Typography className="font-['Geist'] text-[13px] leading-4 font-bold text-[#00a63e]">
									{row.original.activePlayers}
								</Typography>
								<Typography className="font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
									Active
								</Typography>
							</div>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'bets',
				header: "TODAY'S ACTIVITY",
				size: 180,
				Cell: ({ row }) => (
					<div className="space-y-1 font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
						<p>
							<span className="mr-1 text-[#155dfc]">↗</span>Bets:{' '}
							<span className="font-bold text-[#101828]">{row.original.bets}</span>
						</p>
						<p>
							<span className="mr-1 text-[#00a63e]">$</span>Deposits:{' '}
							<span className="font-bold text-[#00a63e]">{row.original.deposits}</span>
						</p>
						<p>
							<span className="mr-1 text-[#fb2c36]">$</span>Withdrawals:{' '}
							<span className="font-bold text-[#fb2c36]">{row.original.withdrawals}</span>
						</p>
						<p className="pt-1">
							Revenue: <span className="font-bold text-[#155dfc]">{row.original.revenue}</span>
						</p>
					</div>
				)
			},
			{
				accessorKey: 'lastDate',
				header: 'LAST ACTIVITY',
				size: 130,
				Cell: ({ row }) => (
					<div className="w-[104px] font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
						<div className="grid grid-cols-[16px_1fr] items-start gap-2 text-[#101828]">
							<FuseSvgIcon
								size={13}
								className="mt-0.5 text-[#4A5565]"
							>
								lucide:clock-3
							</FuseSvgIcon>
							<div className="text-left">
								<p className="font-bold">{row.original.lastDate}</p>
								<p>{row.original.lastTime}</p>
							</div>
						</div>
						<div className="mt-3 grid grid-cols-[16px_1fr] gap-2">
							<span />
							<div className="text-left">
								<p>Created:</p>
								<p>{row.original.created}</p>
							</div>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'status',
				header: 'STATUS',
				size: 115,
				Cell: ({ row }) => (
					<span
						className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-['Geist'] text-[11px] font-semibold ${row.original.status === 'Active'
							? 'bg-[#dcfce7] text-[#008236]'
							: 'bg-[#f1f5f9] text-[#4A5565]'
							}`}
					>
						<FuseSvgIcon size={12}>
							{row.original.status === 'Active' ? 'lucide:circle-check' : 'lucide:circle-x'}
						</FuseSvgIcon>
						{row.original.status}
					</span>
				)
			}
		],
		[]
	);

	return (
		<Paper
			className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-none"
			elevation={0}
		>
			<div className="px-5 pt-5 pb-4">
				<Typography className="font-['Geist'] text-[15px] leading-5 font-semibold text-[#101828]">
					Whitelabel Sites
				</Typography>
				<Typography className="mt-2 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">
					Manage all whitelabel sites and monitor their performance
				</Typography>
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
						<div className="flex items-center justify-center gap-6 pr-1 text-[#155dfc]">
							<button
								type="button"
								onClick={() => onViewSite(row.original)}
								aria-label="View whitelabel"
							>
								<FuseSvgIcon size={15}>lucide:eye</FuseSvgIcon>
							</button>
							<button
								type="button"
								aria-label="Edit whitelabel"
								className="text-[#667085]"
							>
								<FuseSvgIcon size={15}>lucide:square-pen</FuseSvgIcon>
							</button>
						</div>
					)}
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
							fontSize: 11,
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
							py: 2.4,
							verticalAlign: 'top'
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

export default WhitelabelSitesTable;
