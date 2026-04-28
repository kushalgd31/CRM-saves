import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { KycSummaryCardType } from '../../api/types';

type KycSummaryCardsProps = {
	cards: KycSummaryCardType[];
};

const statusStyles: Record<KycSummaryCardType['status'], string> = {
	total: 'bg-blue-50 text-blue-500',
	pending: 'bg-amber-50 text-amber-500',
	approved: 'bg-emerald-50 text-emerald-500',
	rejected: 'bg-rose-50 text-rose-500',
};

function KycSummaryCards({ cards }: KycSummaryCardsProps) {
	return (
		<div className="grid w-full grid-cols-5 gap-4">
			{cards.map((card) => (
				<Paper
					key={card.id}
					className="flex min-h-[116px] flex-col rounded-[16px] border border-slate-200 bg-white px-4 py-5 shadow-none"
					elevation={0}
				>
					<div className="flex items-center justify-between shrink-0 grow-0">
						<Typography className="text-[15px] font-medium text-slate-600">{card.title}</Typography>
						<div className={`flex h-9 w-9 items-center justify-center rounded-xl ${statusStyles[card.status]}`}>
							<FuseSvgIcon size={16}>{card.icon}</FuseSvgIcon>
						</div>
					</div>
					<Typography className="mt-7 text-[20px] leading-none font-semibold text-slate-900">{card.value}</Typography>
				</Paper>
			))}
		</div>
	);
}

export default KycSummaryCards;
