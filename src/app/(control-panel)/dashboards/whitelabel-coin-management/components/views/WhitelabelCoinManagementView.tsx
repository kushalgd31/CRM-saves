'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useState } from 'react';
import PlayerCommissionSummaryCards from '../../../player-commission/components/ui/PlayerCommissionSummaryCards';
import { PlayerCommissionSummaryCardType } from '../../../player-commission/api/types';
import WhitelabelCoinManagementTable, { WhitelabelCoinTabType } from '../ui/WhitelabelCoinManagementTable';

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

const summaryCards: PlayerCommissionSummaryCardType[] = [
	{
		id: 'total-coins',
		title: 'Total Coins in Circulation',
		value: '24,80,000',
		time: 'Across 18 agents',
		rate: null,
		status: 'total'
	},
	{
		id: 'mtd-ggr',
		title: 'MTD GGR(all WLs)',
		value: '₹48.6L',
		time: 'April 2026',
		rate: null,
		status: 'approved'
	},
	{
		id: 'platform-revenue',
		title: 'MTD Platform Revenue',
		value: '₹10.6L',
		time: 'GGR Fees Earned',
		rate: null,
		status: 'total'
	},
	{
		id: 'overdue-invoices',
		title: 'Overdue Invoices',
		value: 3,
		time: '₹3.8L outstanding',
		rate: null,
		status: 'rejected'
	},
	{
		id: 'coins-loaded',
		title: 'Coins loaded this month',
		value: '42.0L',
		time: '12 transactions',
		rate: null,
		status: 'pending'
	}
];

function WhitelabelCoinManagementView() {
	const [activeTab, setActiveTab] = useState<WhitelabelCoinTabType>('overview');

	return (
		<FusePageSimple
			header={
				<div className="container flex w-full">
					<div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
						<div className="flex min-w-0 flex-auto flex-col">
							<Typography className="text-3xl font-semibold tracking-tight">
								Whitelabel Coin Management
							</Typography>
						</div>
					</div>
				</div>
			}
			content={
				<div className="w-full px-4 pt-3 pb-6 md:px-8 mt-4">
					<motion.div
						variants={item}
						initial="hidden"
						animate="show"
						className="space-y-6"
					>
						<PlayerCommissionSummaryCards cards={summaryCards} />
						<div>
							<div className="grid grid-cols-3 border-b border-slate-200 text-center">
								{[
									{ id: 'overview' as const, label: 'Whitelabel Overview' },
									{ id: 'coinTransfer' as const, label: 'Coin Transfers' },
									{ id: 'ggrBilling' as const, label: 'GGR Billing' }
								].map((tab) => (
									<button
										key={tab.id}
										type="button"
										onClick={() => setActiveTab(tab.id)}
										className={`pb-3 text-[13.5px] font-semibold font-[Geist] transition-colors ${
											activeTab === tab.id
												? 'border-b-2 border-blue-500 text-blue-600'
												: 'border-b-2 border-transparent text-slate-700 hover:text-slate-900'
										}`}
									>
										{tab.label}
									</button>
								))}
							</div>
							<WhitelabelCoinManagementTable activeTab={activeTab} />
						</div>
					</motion.div>
				</div>
			}
		/>
	);
}

export default WhitelabelCoinManagementView;
