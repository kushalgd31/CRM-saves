import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PlayerCommissionSummaryCardType } from '../../api/types';

type PlayerCommissionSummaryCardsProps = {
	cards: PlayerCommissionSummaryCardType[];
};

const statusStyles: Record<PlayerCommissionSummaryCardType['status'], string> = {
	total: 'bg-blue-50 text-blue-500',
	pending: 'bg-amber-50 text-amber-500',
	approved: 'bg-emerald-50 text-emerald-500',
	rejected: 'bg-rose-50 text-rose-500'
};

function PlayerCommissionSummaryCards({ cards }: PlayerCommissionSummaryCardsProps) {
	return (
		<div className="grid w-full grid-cols-5 gap-4">
			{cards.map((card) => (
				<Paper
					key={card.id}
					className="flex min-h-35 flex-auto flex-col overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-5"
					elevation={0}
				>
					<div className="flex items-center justify-between px-2 pt-2">
						<Typography
							className="px-3 text-lg text-center leading-6 font-medium tracking-tight whitespace-nowrap"
							color="text.secondary"
						>
							{card.title} { card.rate != null ?  <span> @ {card.rate}</span> : <span></span> }
						</Typography>
					</div>

					<div className="mt-6 text-center">
						<Typography className="text-4xl leading-none font-bold tracking-tight sm:text-6xl">
							{String(card.value)}
						</Typography>
					</div>

					<div className='text-center mt-2 text-green-500'>
						<Typography>
							{card.time}
						</Typography>
					</div>
				</Paper>
			))}
		</div>
	);
}

export default PlayerCommissionSummaryCards;
