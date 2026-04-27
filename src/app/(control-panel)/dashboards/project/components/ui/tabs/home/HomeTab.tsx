import { motion } from 'motion/react';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import BlockedWidget from './widgets/BlockedWidget';
import IssuesWidget from './widgets/IssuesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import NewVsReturningWidget from '../../../../../../dashboards/analytics/components/ui/widgets/NewVsReturningWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import DashboardProductsTable from './widgets/DashboardProductsTable';

/**
 * The HomeTab component.
 */
function HomeTab() {
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

	return (
		<motion.div
			className="grid w-full min-w-0 grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:px-8"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={item}>
				<SummaryWidget />
			</motion.div>
			<motion.div variants={item}>
				<OverdueWidget />
			</motion.div>
			<motion.div variants={item}>
				<IssuesWidget />
			</motion.div>
			<motion.div variants={item}>
				<FeaturesWidget />
			</motion.div>
			<motion.div variants={item}>
				<BlockedWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-5"
			>
				<GithubIssuesWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-5"
			>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<NewVsReturningWidget />
					<ScheduleWidget />
				</div>
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-5"
			>
				<div className="space-y-4">
					<div>
						<h3 className="text-xl font-semibold tracking-tight">Products</h3>
						<p className="text-secondary">Copied from the e-commerce products table and placed at the bottom.</p>
					</div>
					<DashboardProductsTable />
				</div>
			</motion.div>
		</motion.div>
	);
}

export default HomeTab;