'use client';

import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'motion/react';
import KycDashboardAppHeader from '../ui/KycDashboardAppHeader';
import KycSummaryCards from '../ui/KycSummaryCards';
import KycTable from '../ui/KycTable';
import { useGetKycSummary } from '../../api/hooks/useGetKycSummary';

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

function KycDashboardAppView() {
	const { data: summaryCards, isLoading } = useGetKycSummary();

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!summaryCards) {
		return null;
	}

		return (
		<FusePageSimple
			header={<KycDashboardAppHeader />}
			content={
				<div className="w-full px-4 pt-3 pb-6 md:px-8">
					<motion.div
						variants={item}
						initial="hidden"
						animate="show"
						className="space-y-6"
					>
						<KycSummaryCards cards={summaryCards} />
						<KycTable />
					</motion.div>
				</div>
			}
		/>
	);
}

export default KycDashboardAppView;
