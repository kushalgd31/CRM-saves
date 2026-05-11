'use client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseLoading from '@fuse/core/FuseLoading';
import { motion } from 'motion/react';
import DepositDashboardAppHeader from '../ui/DepositDashboardAppHeader';
import DepositTable from '../ui/DepositTable';
import { useGetDepositSummary } from '../../api/hooks/useGetDepositSummary';
import { useGetDepositHealth } from '../../api/hooks/useGetDepositHealth';
import DepositGatewayHealthCard from '../ui/DepositGatewayHealthCard';

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

/**
 * The deposit dashboard app view.
 */
function DepositDashboardAppView() {
	const { data: summaryCards, isLoading: summaryLoading } = useGetDepositSummary();
	const { data: health, isLoading: healthLoading } = useGetDepositHealth();

	if (summaryLoading || healthLoading) {
		return <FuseLoading />;
	}

	if (!summaryCards || !health) {
		return null;
	}

	return (
		<FusePageSimple
			header={<DepositDashboardAppHeader />}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-8">
					<motion.div
						className="w-full"
						variants={container}
						initial="hidden"
						animate="show"
					>
						<motion.div variants={item}>
							<div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-12">
								<div className="grid grid-cols-1 gap-15 sm:grid-cols-2 lg:col-span-5">
									{summaryCards.map((card) => (
										<Paper
											key={card.id}
											className="flex flex-col rounded-lg border border-slate-200 bg-white px-2 py-5 h-38 w-55"
											elevation={0}
										>
											<Typography className="text-left text-[11px] font-semibold leading-4 text-slate-900">
												{card.title}
											</Typography>
											<Typography className="mt-6 text-center text-[35px] leading-none font-semibold tracking-tight text-slate-800">
												{card.value}
											</Typography>
											<div className="mt-1 pt-4 text-center flex justify-between">
												{card.footnotes.map((footnote) => (
													<Typography
														key={footnote.label}
														className={`text-[11px] font-medium leading-5 ${
															footnote.color === 'green'
																? 'text-emerald-500'
																: footnote.color === 'red'
																	? 'text-red-500'
																	: 'text-amber-500'
														}`}
													>
														{footnote.label}
													</Typography>
												))}
											</div>
										</Paper>
									))}
								</div>

								<div className="lg:col-span-7 relative bottom-6 right-4">
									<DepositGatewayHealthCard health={health} />
								</div>
							</div>
						</motion.div>

						<motion.div
							variants={item}
							className="flex flex-auto flex-col mt-[-2%]"
						>
							<DepositTable />
						</motion.div>
					</motion.div>
				</div>
			}
		/>
	);
}

export default DepositDashboardAppView;
