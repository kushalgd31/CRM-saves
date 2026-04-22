import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DepositHealthType } from '../../api/types';

const progressColors = {
	green: 'bg-emerald-500',
	amber: 'bg-amber-500',
	red: 'bg-red-500'
} as const;

const textColors = {
	green: 'text-emerald-500',
	amber: 'text-amber-500',
	red: 'text-red-500'
} as const;

type DepositGatewayHealthCardProps = {
	health: DepositHealthType;
};

function DepositGatewayHealthCard({ health }: DepositGatewayHealthCardProps) {
	return (
		<Paper
			className="overflow-hidden rounded-2xl border border-slate-200 px-4 py-3 shadow-none"
			elevation={0}
		>
			<div className="flex h-full flex-col">
				<Typography className="text-[11px] font-medium text-slate-500">{health.title}</Typography>

				<div className="mt-3 flex min-w-0 flex-1 flex-col gap-2">
					{health.metrics.map((metric) => (
						<div
							key={metric.id}
							className="grid min-w-0 grid-cols-[56px_minmax(0,1fr)_52px] items-center gap-3"
						>
							<Typography className="text-[11px] font-medium text-slate-600">{metric.label}</Typography>
							<div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
								<div
									className={`h-full rounded-full ${progressColors[metric.color]}`}
									style={{ width: `${metric.value}%` }}
								/>
							</div>
							<Typography className={`text-right text-[11px] font-semibold ${textColors[metric.color]}`}>
								{metric.value.toFixed(1)}%
							</Typography>
						</div>
					))}
				</div>

				<Typography className="mt-3 break-words border-t border-slate-100 pt-2 text-[10px] leading-4 text-slate-400">
					{health.note}
				</Typography>
			</div>
		</Paper>
	);
}

export default DepositGatewayHealthCard;
