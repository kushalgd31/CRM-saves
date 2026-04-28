'use client';

<<<<<<< HEAD
import FusePageSimple from '@fuse/core/FusePageSimple';
import WithdrawDashboardAppHeader from '../ui/WithdrawDashboardAppHeader';
import WithdrawTable from '../ui/WithdrawTable';

function WithdrawDashboardAppView() {
=======
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseLoading from '@fuse/core/FuseLoading';
import { motion } from 'motion/react';
import WithdrawDashboardAppHeader from '../ui/WithdrawDashboardAppHeader';
import WithdrawTable from '../ui/WithdrawTable';
import { useGetWithdrawSummary } from '../../api/hooks/useGetWithdrawSummary';
import { useGetWithdrawHealth } from '../../api/hooks/useGetWithdrawHealth';
import WithdrawGatewayHealthCard from '../ui/WithdrawGatewayHealthCard';

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
 * The withdraw dashboard app view.
 */
function WithdrawDashboardAppView() {
	const { data: summaryCards, isLoading: summaryLoading } = useGetWithdrawSummary();
	const { data: health, isLoading: healthLoading } = useGetWithdrawHealth();

	if (summaryLoading || healthLoading) {
		return <FuseLoading />;
	}

	if (!summaryCards || !health) {
		return null;
	}

>>>>>>> b38b221830ba5bff29df10281ef1a567ea61cc2c
	return (
		<FusePageSimple
			header={<WithdrawDashboardAppHeader />}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-8">
<<<<<<< HEAD
					<WithdrawTable />
=======
					<motion.div
						className="w-full"
						variants={container}
						initial="hidden"
						animate="show"
					>
						<motion.div variants={item}>
							<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-12">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
									{summaryCards.map((card) => (
										<Paper
											key={card.id}
											className="flex min-h-[210px] flex-col rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-none"
											elevation={0}
										>
											<Typography className="text-left text-[11px] font-semibold leading-4 text-slate-900">
												{card.title}
											</Typography>
											<Typography className="mt-10 text-center text-[42px] leading-none font-semibold tracking-tight text-slate-800">
												{card.value}
											</Typography>
											<div className="mt-auto pt-4 text-center">
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

								<div className="lg:col-span-7">
									<WithdrawGatewayHealthCard health={health} />
								</div>
							</div>
						</motion.div>

						<motion.div
							variants={item}
							className="mt-4 flex flex-auto flex-col"
						>
							<WithdrawTable />
						</motion.div>
					</motion.div>
>>>>>>> b38b221830ba5bff29df10281ef1a567ea61cc2c
				</div>
			}
		/>
	);
}

export default WithdrawDashboardAppView;
