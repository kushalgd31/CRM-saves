import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { ReactNode, useMemo, useState } from 'react';
import { useGetWithdrawRows } from '../../api/hooks/useGetWithdrawRows';
import DepositActionButtons from '../../../deposit/components/ui/DepositActionButtons';

const columns = [
	{ key: 'id', label: 'ID' },
	{ key: 'username', label: 'Username' },
	{ key: 'amount', label: 'Amount' },
	{ key: 'method', label: 'Method' },
	{ key: 'status', label: 'Status' },
	{ key: 'age', label: 'Age' },
	{ key: 'kyc', label: 'KYC' },
	{ key: 'flags', label: 'Flags' }
] as const;

function WithdrawTable() {
	const { data: withdrawRows, isLoading } = useGetWithdrawRows();
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
	const [searchText, setSearchText] = useState('');
	const safeRows = withdrawRows ?? [];

	const selectedRow = safeRows.find((row) => row.id === selectedRowId) ?? null;
	const filteredRows = useMemo(() => {
		const query = searchText.trim().toLowerCase();

		if (!query) {
			return safeRows;
		}

		return safeRows.filter((row) =>
			`${row.id} ${row.username} ${row.amount} ${row.method} ${row.status} ${row.kyc} ${row.flags}`
				.toLowerCase()
				.includes(query)
		);
	}, [safeRows, searchText]);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!withdrawRows) {
		return null;
	}

	function renderValue(value: string | ReactNode) {
		if (typeof value === 'string') {
			return <Typography className="text-[13px] font-semibold leading-5 text-slate-800">{value || '-'}</Typography>;
		}

		return value;
	}

	function renderDetailSection(title: string, items: { label: string; value: string | ReactNode }[]) {
		return (
			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="border-b border-slate-200 px-5 py-4">
					<Typography className="text-[15px] font-bold tracking-tight text-slate-900">{title}</Typography>
				</div>
				<div className="px-5">
					{items.map((item) => (
						<div
							key={`${title}-${item.label}`}
							className="grid grid-cols-[170px,1fr] gap-4 border-b border-slate-100 py-3 last:border-b-0"
						>
							<Typography className="text-[12px] font-medium uppercase tracking-[0.08em] text-slate-400">
								{item.label}
							</Typography>
							<div className="min-w-0">{renderValue(item.value)}</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<>
			<Paper
				className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-none"
				elevation={0}
			>
				<div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
					<Typography className="ml-1 text-lg font-semibold tracking-tight text-slate-900">Withdraw</Typography>
					<TextField
						placeholder="Search..."
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						size="small"
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FuseSvgIcon
										size={14}
										className="text-slate-400"
									>
										lucide:search
									</FuseSvgIcon>
								</InputAdornment>
							)
						}}
						sx={{
							width: 220,
							'& .MuiOutlinedInput-root': {
								height: 32,
								fontSize: 12,
								borderRadius: '8px',
								backgroundColor: '#fff'
							},
							'& .MuiInputBase-input': {
								paddingY: '6px',
								paddingLeft: 0
							},
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: '#e2e8f0'
							}
						}}
					/>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-[980px] border-collapse">
						<thead>
							<tr className="border-b border-slate-100 bg-white">
								{columns.map((column) => (
									<th
										key={column.key}
										className="px-3 py-4 text-center text-[11px] font-bold text-slate-900"
									>
										<div className="flex items-center justify-center gap-1">
											<span className="truncate">{column.label}</span>
											<FuseSvgIcon
												size={9}
												className="text-slate-300"
											>
												lucide:arrow-up-down
											</FuseSvgIcon>
										</div>
									</th>
								))}
								<th
									className="sticky right-0 w-[92px] bg-white px-3 py-4 text-center text-[11px] font-bold text-slate-900"
									style={{ boxShadow: 'inset 4px 0 4px -4px rgba(97, 97, 97, 0.5)' }}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredRows.map((row) => (
								<tr
									key={row.id}
									className="border-b border-slate-50 bg-white"
								>
									{columns.map((column) => (
										<td
											key={`${row.id}-${column.key}`}
											className="px-3 py-[18px] text-center align-middle text-[11px] text-slate-900"
										>
											{column.key === 'id' ? (
												<button
													type="button"
													onClick={() => setSelectedRowId(row.id)}
													className="text-primary-600 hover:underline"
												>
													{row[column.key]}
												</button>
											) : (
												<span className="block truncate">{row[column.key]}</span>
											)}
										</td>
									))}
									<td
										className="sticky right-0 w-[84px] bg-white px-3 py-[18px] text-[11px] text-slate-900"
										style={{ boxShadow: 'inset 4px 0 4px -4px rgba(97, 97, 97, 0.5)' }}
									>
										<DepositActionButtons name={row.username} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
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
				<div className="flex h-full flex-col bg-slate-50">
					<div className="border-b border-slate-200 bg-white">
						<div className="flex items-center justify-between px-6 py-4">
							<Typography className="text-[15px] font-semibold tracking-tight text-slate-900">
								Withdraw Details
							</Typography>
							<IconButton
								onClick={() => setSelectedRowId(null)}
								className="text-slate-400 hover:text-slate-700"
								aria-label="Close details popup"
							>
								<FuseSvgIcon size={18}>lucide:x</FuseSvgIcon>
							</IconButton>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto">
						<img
							src={selectedRow?.coverImageUrl}
							alt="Popup header"
							className="h-36 w-full object-cover"
						/>

						<div className="space-y-5 p-5">
							<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
								<div className="flex items-start justify-between gap-4">
									<div>
										<Typography className="text-[12px] font-medium uppercase tracking-[0.12em] text-slate-400">
											Withdraw Transaction
										</Typography>
										<Typography className="mt-2 text-[28px] font-bold tracking-tight text-slate-900">
											{selectedRow?.amount ?? '-'}
										</Typography>
									</div>
									<div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-600">
										{selectedRow?.status ?? '-'}
									</div>
								</div>
								<Typography className="mt-3 text-[13px] text-slate-500">
									ID {selectedRow?.id ?? '-'} | {selectedRow?.method ?? '-'} | {selectedRow?.flags ?? '-'}
								</Typography>
							</div>

							{selectedRow &&
								renderDetailSection('User Details', [
									{ label: 'Username', value: selectedRow.username },
									{ label: 'Phone No', value: selectedRow.phoneNo },
									{ label: 'IP', value: selectedRow.ip },
									{ label: 'OS', value: selectedRow.os },
									{ label: 'Device', value: selectedRow.device }
								])}

							{selectedRow &&
								renderDetailSection('Referral', [{ label: 'Agent Name', value: selectedRow.agentName }])}

							{selectedRow &&
								renderDetailSection('Withdraw', [
									{ label: 'Amount', value: selectedRow.amount },
									{ label: 'Type', value: selectedRow.method },
									{ label: 'Acc Name', value: selectedRow.accName },
									{ label: 'Acc Number', value: selectedRow.accNumber },
									{ label: 'IFSC', value: selectedRow.ifsc },
									{ label: 'UPI ID', value: selectedRow.upiId },
									{ label: 'QR', value: selectedRow.qr },
									{ label: 'Risk %', value: selectedRow.riskPercentage }
								])}

							{selectedRow &&
								renderDetailSection('Audit', [
									{ label: 'Last Deposit', value: selectedRow.lastDeposit },
									{ label: 'Total Deposit', value: selectedRow.totalDeposit },
									{ label: 'Total Withdraw', value: selectedRow.totalWithdraw },
									{ label: 'GGR', value: selectedRow.ggr },
									{
										label: 'No. of bets placed since last deposit',
										value: selectedRow.betsCountSinceLastDeposit
									},
									{
										label: 'Value of bets placed since last deposit',
										value: selectedRow.betsValueSinceLastDeposit
									}
								])}
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}

export default WithdrawTable;
