import { WhitelabelMetric } from '../types';
import HeirCard from '../../../academy/components/ui/HeirCard';

type WhitelabelSummaryCardsProps = {
	metrics: WhitelabelMetric[];
};

function WhitelabelSummaryCards({ metrics }: WhitelabelSummaryCardsProps) {
	return (
		<div className="mb-6 grid grid-cols-4 gap-4">
			{metrics.map((metric) => (
				<HeirCard
					key={metric.title}
					title=""
					variant="compact"
					data={{
						count: metric.value,
						name: metric.label,
						color: metric.color
					}}
				/>
			))}
		</div>
	);
}

export default WhitelabelSummaryCards;
