import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { KycSummaryCardType } from '../../api/types';

type KycSummaryCardsProps = {
	cards: KycSummaryCardType[];
};

const statusStyles: Record<KycSummaryCardType['status'], string> = {
	total: 'bg-blue-50 text-blue-500',
	pending: 'bg-amber-50 text-amber-500',
	approved: 'bg-emerald-50 text-emerald-500',
	rejected: 'bg-rose-50 text-rose-500'
};

function KycSummaryCards({ cards }: KycSummaryCardsProps) {
	return (
		<div className="grid w-full grid-cols-5 gap-4">
			{cards.map((card) => (
				<Paper
					key={card.id}
					className="flex min-h-35 flex-auto flex-col overflow-hidden rounded-xl border border-slate-200 shadow-sm"
					elevation={0}
				>
					<div className="items-center justify-between px-2 pt-2">
						<Typography
							className="whitespace-nowrap px-2 text-md leading-6 font-medium tracking-tight"
							color="text.secondary"
						>
							{card.title}
						</Typography>
					</div>

					<div className="mt-4 text-center">
						<Typography className="text-4xl leading-none font-bold tracking-tight sm:text-7xl">
							{String(card.value)}
						</Typography>
					</div>
				</Paper>
			))}
		</div>
	);
}

export default KycSummaryCards;
