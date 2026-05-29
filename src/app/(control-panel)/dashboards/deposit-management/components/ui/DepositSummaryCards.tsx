import HeirCard from '../../../../apps/academy/components/ui/HeirCard';
import { DepositSummaryCard } from '../types';

type DepositSummaryCardsProps = {
	cards: DepositSummaryCard[];
};

const toneMap: Record<string, string> = {
	'text-[#00a63e]': 'success',
	'text-[#155dfc]': 'primary',
	'text-[#9810fa]': 'secondary',
	'text-[#ff4f0f]': 'warning'
};

function DepositSummaryCards({ cards }: DepositSummaryCardsProps) {
	return (
		<div className="mb-6 grid grid-cols-4 gap-4">
			{cards.map((card) => (
				<HeirCard
					key={card.id}
					title=""
					variant="compact"
					data={{
						count: card.value,
						name: card.label,
						color: toneMap[card.color] ?? card.color
					}}
				/>
			))}
		</div>
	);
}

export default DepositSummaryCards;
