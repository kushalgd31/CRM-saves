import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';

function TransactionsDashboardAppHeader() {
	return (
		<div className="flex w-full flex-col sm:flex-row items-center justify-between p-4 md:px-8">
			<div className="flex items-center">
				<motion.div
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
				>
					<Typography className="text-[28px] font-bold tracking-tight text-slate-900">
						Transactions
					</Typography>
				</motion.div>
			</div>
		</div>
	);
}

export default TransactionsDashboardAppHeader;
