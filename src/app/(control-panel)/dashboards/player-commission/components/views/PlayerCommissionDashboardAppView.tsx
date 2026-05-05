'use client';

import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'motion/react';
import PlayerCommissionDashboardAppHeader from '../ui/PlayerCommissionDashboardAppHeader';
import PlayerCommissionSummaryCards from '../ui/PlayerCommissionSummaryCards';
import PlayerCommissionTable from '../ui/PlayerCommissionTable';
import { useGetPlayerCommissionRows } from '../../api/hooks/useGetPlayerCommissionRows';
import { useGetPlayerCommissionSummary } from '../../api/hooks/useGetPlayerCommissionSummary';

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

function PlayerCommissionDashboardAppView() {
	const { data: rows, isLoading: isRowsLoading } = useGetPlayerCommissionRows();
	const { data: summaryCards, isLoading: isSummaryLoading } = useGetPlayerCommissionSummary();

	if (isRowsLoading || isSummaryLoading) {
		return <FuseLoading />;
	}

	if (!rows || !summaryCards) {
		return null;
	}

	return (
		<FusePageSimple
			header={<PlayerCommissionDashboardAppHeader />}
			content={
				<div className="w-full px-4 pt-3 pb-6 md:px-8">
					<motion.div
						variants={item}
						initial="hidden"
						animate="show"
						className="space-y-6"
					>
						<PlayerCommissionSummaryCards cards={summaryCards} />
						<PlayerCommissionTable />
					</motion.div>
				</div>
			}
		/>
	);
}

export default PlayerCommissionDashboardAppView;
