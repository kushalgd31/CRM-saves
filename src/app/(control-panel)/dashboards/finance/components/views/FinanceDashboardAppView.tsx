'use client';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'motion/react';
import FinanceOverviewWidget from '../ui/widgets/FinanceOverviewWidget';

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

function FinanceDashboardAppView() {
	return (
		<FusePageSimple
			header={null}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-6">
					<motion.div
						variants={item}
						initial="hidden"
						animate="show"
					>
						<FinanceOverviewWidget />
					</motion.div>
				</div>
			}
		/>
	);
}

export default FinanceDashboardAppView;
