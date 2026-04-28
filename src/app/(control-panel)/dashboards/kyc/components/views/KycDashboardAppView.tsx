'use client';

import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'motion/react';
import KycDashboardAppHeader from '../ui/KycDashboardAppHeader';
import KycSummaryCards from '../ui/KycSummaryCards';
import KycTable from '../ui/KycTable';
import { useGetKycRows } from '../../api/hooks/useGetKycRows';
import { useMemo } from 'react';


const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

function KycDashboardAppView() {
	const { data: rows, isLoading } = useGetKycRows();

	const summaryCards: import('../../api/types').KycSummaryCardType[] = useMemo(() => {
		if (!rows) {
			return [];
		}

		const pendingKycCount = rows.filter((row) =>
			['panCard', 'idProof', 'selfie', 'bankAccount'].some((field) => row[field as keyof typeof row] === 'pending')
		).length;

		const pendingBankAccounts = rows.filter((row) => row.bankAccount === 'pending').length;

		const fullyApprovedAccounts = rows.filter((row) =>
			['panCard', 'idProof', 'selfie', 'bankAccount'].every((field) => row[field as keyof typeof row] === 'approved')
		).length;

		const approvedBankAccounts = rows.filter((row) => row.bankAccount === 'approved').length;

		const rejectedProofs = rows.filter((row) =>
			['panCard', 'idProof', 'selfie', 'bankAccount'].some((field) => row[field as keyof typeof row] === 'rejected')
		).length;

		return [
			{
				id: 'pending KYCs',
				title: 'Pending KYCs',
				value: pendingKycCount,
				icon: 'lucide:file-text',
				status: 'total'
			},
			{
				id: 'pending',
				title: 'Pending Bank Accounts',
				value: pendingBankAccounts,
				icon: 'lucide:clock-3',
				status: 'pending'
			},
			{
				id: 'approved',
				title: 'Approved KYCs',
				value: fullyApprovedAccounts,
				icon: 'lucide:circle-check',
				status: 'approved'
			},
			{
				id: 'approve bank',
				title: 'Approved Bank Accounts',
				value: approvedBankAccounts,
				icon: 'lucide:circle-check',
				status: 'approved'
			},
			{
				id: 'rejected',
				title: 'Rejected',
				value: rejectedProofs,
				icon: 'lucide:circle-x',
				status: 'rejected'
			}
		];
	}, [rows]);


	if (isLoading) {
		return <FuseLoading />;
	}

	if (!rows) {
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
