'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useState } from 'react';
import PlayerCommissionSummaryCards from '../../../player-commission/components/ui/PlayerCommissionSummaryCards';
import { PlayerCommissionSummaryCardType } from '../../../player-commission/api/types';
import AgentCoinManagementTable, { AgentCoinTabType } from '../ui/AgentCoinManagementTable';

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
		id: 'loaded-today',
		title: 'Loaded today',
		value: '3,50,000',
		time: '5 Load Transactions',
		rate: null,
		status: 'approved'
	},
	{
		id: 'distributed',
		title: 'Distributed to players',
		value: '1,82,000',
		time: 'Today, 34 players',
		rate: null,
		status: 'pending'
	},
	{
		id: 'low-balance',
		title: 'Low Balance Agents',
		value: 3,
		time: 'Below 10k threshold',
		rate: null,
		status: 'rejected'
	},
	{
		id: 'commission',
		title: 'Commission Earning(MTD)',
		value: '₹4,12,000',
		time: 'Based on player GGR',
		rate: null,
		status: 'total'
	}
];

function AgentCoinManagementView() {
	const [activeTab, setActiveTab] = useState<AgentCoinTabType>('balances');

	return (
		<FusePageSimple
			header={
				<div className="container flex w-full">
					<div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
						<div className="flex min-w-0 flex-auto flex-col">
							<Typography className="text-3xl font-semibold tracking-tight">
								Agent Coin Management
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
									{ id: 'balances' as const, label: 'Agent Balances' },
									{ id: 'transferHistory' as const, label: 'Transfer History' },
									{ id: 'commission' as const, label: 'Commission' }
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
							<AgentCoinManagementTable activeTab={activeTab} />
						</div>
					</motion.div>
				</div>
			}
		/>
	);
}

export default AgentCoinManagementView;
