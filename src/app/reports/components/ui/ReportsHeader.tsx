import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';

type ReportsHeaderProps = {
	title?: string;
};

function ReportsHeader({ title }: ReportsHeaderProps) {
	return (
		<div className="container flex w-full">
			<div className="flex w-full flex-col gap-3 px-4 pt-4 pb-0 md:px-8">
				{title && (
					<div className="flex min-w-0 flex-auto flex-col">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.08 } }}
						>
							<Typography className="text-3xl font-semibold tracking-tight">{title}</Typography>
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ReportsHeader;
