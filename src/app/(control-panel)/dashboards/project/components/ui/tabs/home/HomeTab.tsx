import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import NewVsReturningWidget from '../../../../../../dashboards/analytics/components/ui/widgets/NewVsReturningWidget';
import DataTable from 'src/components/data-table/DataTable';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import { useGetWidgets } from '../../../../api/hooks/widgets/useGetWidgets';

type OverviewRangeWidget = {
	currentRange?: string;
	data: {
		name: string;
		count: Record<string, number | string>;
		extra: {
			name: string;
			count: Record<string, number | string>;
		};
	};
};

type OverviewStaticWidget = {
	title?: string;
	data: {
		name: string;
		count: number | string;
		extra: {
			name: string;
			count: number | string;
		};
	};
};

type OverviewCard = {
	id: string;
	title: string;
	value: number | string;
	footnote: string;
	footnoteTone: string;
};

type PlayerSignalRow = {
	time: string;
	type: 'Big Win' | 'Risk Alert' | 'Big Loss' | 'Lg withdrawal';
	player: string;
	tag?: 'VIP' | 'New';
	details: string;
	amount: string;
	amountTone: 'positive' | 'negative' | 'neutral';
	status: 'Monitoring' | 'Action Needed' | 'Under Review' | 'Flagged';
	statusTone: 'amber' | 'red';
};

/**
 * The HomeTab component.
 */
function HomeTab() {
	const { data: widgets, isLoading: isWidgetsLoading } = useGetWidgets();

	const overviewCards = useMemo<OverviewCard[]>(() => {
		if (!widgets) {
			return [];
		}

		const summaryWidget = widgets.summary as OverviewRangeWidget | undefined;
		const overdueWidget = widgets.overdue as unknown as OverviewStaticWidget | undefined;
		const issuesWidget = widgets.issues as unknown as OverviewStaticWidget | undefined;
		const featuresWidget = widgets.features as unknown as OverviewStaticWidget | undefined;
		const blockedWidget = widgets.blocked as unknown as OverviewStaticWidget | undefined;
		const currentRange = summaryWidget?.currentRange ?? 'DT';

		return [
			{
				id: 'summary',
				title: summaryWidget?.data.name ?? 'Summary',
				value: summaryWidget?.data.count?.[currentRange] ?? '--',
				footnote: `${summaryWidget?.data.extra.name ?? 'Updated'}: ${
					summaryWidget?.data.extra.count?.[currentRange] ?? '--'
				}`,
				footnoteTone: 'text-emerald-600'
			},
			{
				id: 'overdue',
				title: overdueWidget?.title ?? 'Overdue',
				value: overdueWidget?.data.count ?? '--',
				footnote: `${overdueWidget?.data.extra.name ?? 'Updated'}: ${overdueWidget?.data.extra.count ?? '--'}`,
				footnoteTone: 'text-emerald-600'
			},
			{
				id: 'issues',
				title: issuesWidget?.title ?? 'Issues',
				value: issuesWidget?.data.count ?? '--',
				footnote: `${issuesWidget?.data.extra.name ?? 'Updated'}: ${issuesWidget?.data.extra.count ?? '--'}`,
				footnoteTone: 'text-slate-500'
			},
			{
				id: 'features',
				title: featuresWidget?.title ?? 'Features',
				value: featuresWidget?.data.count ?? '--',
				footnote: `${featuresWidget?.data.extra.name ?? 'Updated'}: ${
					featuresWidget?.data.extra.count ?? '--'
				}`,
				footnoteTone: 'text-rose-500'
			},
			{
				id: 'blocked',
				title: blockedWidget?.title ?? 'Blocked',
				value: blockedWidget?.data.count ?? '--',
				footnote: `${blockedWidget?.data.extra.name ?? 'Updated'}: ${blockedWidget?.data.extra.count ?? '--'}`,
				footnoteTone: 'text-slate-500'
			}
		];
	}, [widgets]);

	const playerSignalRows = useMemo<PlayerSignalRow[]>(
		() => [
			{
				time: '2 min',
				type: 'Big Win',
				player: 'Rajesh K.',
				tag: 'VIP',
				details: 'IPL - CSK vs MI, 34 bets, live match',
				amount: '+Rs 4,82,000',
				amountTone: 'positive',
				status: 'Monitoring',
				statusTone: 'amber'
			},
			{
				time: '8 min',
				type: 'Risk Alert',
				player: '--',
				details: 'Multi-account: 3 accounts on same device fingerprint',
				amount: '--',
				amountTone: 'neutral',
				status: 'Action Needed',
				statusTone: 'red'
			},
			{
				time: '12 min',
				type: 'Big Win',
				player: 'Priya R.',
				tag: 'VIP',
				details: 'Played 6 hrs today, requesting cashout',
				amount: '+Rs 4,82,000',
				amountTone: 'negative',
				status: 'Under Review',
				statusTone: 'amber'
			},
			{
				time: '22 min',
				type: 'Big Loss',
				player: 'Deepa T',
				tag: 'New',
				details: 'Account age: 2 days, no KYC docs yet',
				amount: '+Rs 2,82,000',
				amountTone: 'positive',
				status: 'Flagged',
				statusTone: 'red'
			}
		],
		[]
	);

	const playerSignalColumns = useMemo<MRT_ColumnDef<PlayerSignalRow>[]>(
		() => [
			{
				accessorKey: 'time',
				header: 'Time',
				size: 90
			},
			{
				accessorKey: 'type',
				header: 'Type',
				size: 120,
				Cell: ({ row }) => {
					const toneMap: Record<PlayerSignalRow['type'], string> = {
						'Big Win': 'bg-emerald-50 text-emerald-700',
						'Risk Alert': 'bg-rose-50 text-rose-700',
						'Big Loss': 'bg-rose-50 text-rose-700',
						'Lg withdrawal': 'bg-amber-50 text-amber-700'
					};

					return (
						<Chip
							label={row.original.type}
							size="small"
							className={toneMap[row.original.type]}
						/>
					);
				}
			},
			{
				accessorKey: 'player',
				header: 'Player',
				size: 160,
				Cell: ({ row }) => (
					<div className="flex items-center gap-2">
						<span className="font-medium text-slate-900">{row.original.player}</span>
						{row.original.tag && (
							<span
								className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
									row.original.tag === 'VIP'
										? 'bg-slate-100 text-slate-500'
										: 'bg-emerald-50 text-emerald-600'
								}`}
							>
								{row.original.tag}
							</span>
						)}
					</div>
				)
			},
			{
				accessorKey: 'details',
				header: 'Details',
				size: 360,
				Cell: ({ row }) => <span className="text-slate-600">{row.original.details}</span>
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
				size: 120,
				Cell: ({ row }) => (
					<span
						className={`font-semibold ${
							row.original.amountTone === 'positive'
								? 'text-emerald-600'
								: row.original.amountTone === 'negative'
									? 'text-rose-600'
									: 'text-slate-400'
						}`}
					>
						{row.original.amount}
					</span>
				)
			},
			{
				accessorKey: 'status',
				header: 'Status',
				size: 150,
				Cell: ({ row }) => (
					<div className="flex items-center gap-2">
						<span
							className={`h-2 w-2 rounded-full ${
								row.original.statusTone === 'amber' ? 'bg-amber-400' : 'bg-red-500'
							}`}
						/>
						<span className="text-slate-700">{row.original.status}</span>
					</div>
				)
			}
		],
		[]
	);

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			className="grid w-full min-w-0 grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 md:grid-cols-4 md:px-8 lg:grid-cols-5"
			variants={container}
			initial="hidden"
			animate="show"
		>
			{(isWidgetsLoading
				? Array.from({ length: 5 }, (_, index) => ({
					id: `loading-${index}`,
					title: '',
					value: '',
					footnote: '',
					footnoteTone: ''
				}))
				: overviewCards
			).map((card) => (
				<motion.div
					key={card.id}
					variants={item}
				>
					<Paper
						className="flex min-h-[132px] flex-col rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
						elevation={0}
					>
						{isWidgetsLoading ? (
							<div className="flex h-full animate-pulse flex-col">
								<div className="h-3 w-24 rounded bg-slate-200" />
								<div className="mt-8 h-10 w-28 rounded bg-slate-200" />
								<div className="mt-auto h-3 w-32 rounded bg-slate-200" />
							</div>
						) : (
							<>
								<p className="text-md font-medium font-[geist]">{card.title}</p>
								<div className="mt-4">
									<p className="text-[38px] leading-none font-bold text-center tracking-tight text-slate-800">
										{typeof card.value === 'number'
											? card.value.toLocaleString('en-IN')
											: card.value}
									</p>
								</div>
								<p className={` font-medium pt-5 text-[11px] text-center font-medium ${card.footnoteTone}`}>
									{card.footnote}
								</p>
							</>
						)}
					</Paper>
				</motion.div>
			))}
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-5"
			>
				<GithubIssuesWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-5"
			>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<NewVsReturningWidget />
					<ScheduleWidget />
				</div>
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-5"
			>
				<div className="space-y-4">
					<div>
						<h3 className="text-xl font-[geist] font-semibold tracking-tight mb-1.5">Recent Transactions</h3>
						{/* <p className="text-secondary">Recent player wins, losses, withdrawals, and risk signals.</p> */}
					</div>
					<Paper
						className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-xl shadow-sm"
						elevation={2}
					>
						<DataTable
							data={playerSignalRows}
							columns={playerSignalColumns}
							enableRowActions={false}
							enableRowSelection={false}
							enableColumnActions={true}
							enableColumnOrdering={false}
							enableGrouping={false}
							enableColumnPinning={false}
							enableTopToolbar={true}
							enableBottomToolbar={false}
							enablePagination={false}
							enableSorting={true}
							muiTableHeadCellProps={{
								sx: {
									py: 1.75,
									fontSize: 12,
									fontWeight: 500,
									color: '#000000',
									backgroundColor: '#ffffff'
								}
							}}
							muiTableBodyCellProps={{
								sx: {
									py: 1.5,
									fontSize: 13,
									borderBottom: '1px solid #eef2f7'
								}
							}}
							muiTablePaperProps={{
								elevation: 0,
								square: true,
								className: 'flex h-full flex-col flex-auto'
							}}
							muiTableContainerProps={{
								className: 'flex-auto overflow-x-auto'
							}}
						/>
					</Paper>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default HomeTab;
