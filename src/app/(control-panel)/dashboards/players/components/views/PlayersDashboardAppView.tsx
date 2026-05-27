'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import PlayersTable from '../ui/PlayersTable';

const item = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0 }
};

function PlayersDashboardAppView() {
	return (
		<FusePageSimple
			header={
				<div className="container flex w-full">
					<div className="flex w-full flex-col gap-3 px-4 pt-4 pb-0 md:px-8">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.08 } }}
						>
							<Typography
								className="text-3xl tracking-tight text-slate-900"
								sx={{ fontFamily: 'Geist, Inter, sans-serif', fontWeight: 600 }}
							>
								Players
							</Typography>
						</motion.div>
					</div>
				</div>
			}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-8">
					<motion.div
						variants={item}
						initial="hidden"
						animate="show"
						className="flex flex-auto flex-col"
					>
						<PlayersTable />
					</motion.div>
				</div>
			}
		/>
	);
}

export default PlayersDashboardAppView;
