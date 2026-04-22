import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import FinanceOverviewWidgetType from '../../../api/types/FinanceOverviewWidgetType';
import { useGetWidget } from '../../../api/hooks/widgets/useGetWidget';

type OverviewCardProps = {
	title: string;
	value: string;
	note?: string;
	noteTone?: 'default' | 'success';
	variant: 'primary' | 'secondary';
};

function OverviewCard(props: OverviewCardProps) {
	const { title, value, note, noteTone = 'default', variant } = props;
	const isPrimary = variant === 'primary';

	return (
		<Paper
			className={clsx(
				'flex h-full w-full flex-col items-center justify-center rounded-2xl border-0 text-center shadow-none',
				isPrimary
					? 'min-h-[140px] bg-[#eef1f6] px-6 py-7'
					: 'min-h-[90px] bg-[#eef1f6] px-3 py-5'
			)}
			elevation={0}
		>
			<Typography
				className={clsx(
					'tracking-tight',
					isPrimary
						? 'text-[36px] leading-none font-bold text-[#1a3068]'
						: 'text-[24px] leading-none font-bold text-[#2d3748]'
				)}
			>
				{value}
			</Typography>
			<Typography
				className={clsx(
					isPrimary
						? 'mt-2.5 text-[13px] leading-none font-semibold text-[#2563eb]'
						: 'mt-2 text-[11px] leading-none font-medium text-slate-500'
				)}
			>
				{title}
			</Typography>
			{isPrimary && (
				<Typography
					className={clsx(
						'mt-4 text-[12px] leading-none font-normal',
						noteTone === 'success' ? 'text-green-600' : 'text-slate-400'
					)}
				>
					{note ?? '\u00A0'}
				</Typography>
			)}
		</Paper>
	);
}

function FinanceOverviewWidget() {
	const { data: widget, isLoading } = useGetWidget<FinanceOverviewWidgetType>('financeOverview');

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}

	return (
		<div className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-5">
			<div className="flex items-start justify-between gap-4">
				<div>
					<Typography className="text-[15px] leading-none font-medium tracking-tight text-slate-900">
						{widget.title}
					</Typography>
					<Typography className="mt-6 text-[12px] leading-none font-medium text-slate-700">
						{widget.subtitle}
					</Typography>
				</div>
				<div className="rounded-lg bg-slate-100 px-4 py-2">
					<Typography className="text-[12px] leading-none font-medium text-slate-600">
						Live Balance: {widget.liveBalance}
					</Typography>
				</div>
			</div>

			<div className="mt-4 grid grid-cols-4 gap-3">
				{widget.primaryCards.map((card) => (
					<OverviewCard
						key={card.title}
						title={card.title}
						value={card.value}
						note={card.note}
						noteTone={card.noteTone}
						variant="primary"
					/>
				))}
			</div>

			<div className="mt-3 flex gap-2">
				{widget.secondaryCards.map((card) => (
					<div
						key={card.title}
						className="min-w-0 flex-1"
					>
						<OverviewCard
							title={card.title}
							value={card.value}
							variant="secondary"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default FinanceOverviewWidget;
