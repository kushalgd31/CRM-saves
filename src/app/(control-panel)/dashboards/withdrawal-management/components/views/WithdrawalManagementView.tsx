'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { DepositMethod } from '../../../deposit-management/components/types';
import DepositMethodsTable from '../../../deposit-management/components/ui/DepositMethodsTable';
import DepositSummaryCards from '../../../deposit-management/components/ui/DepositSummaryCards';
import EditPaymentMethodDialog from '../../../deposit-management/components/ui/EditPaymentMethodDialog';
import { withdrawalMethods, withdrawalSummaryCards } from '../data/withdrawalManagementData';

function WithdrawalManagementView() {
	const [selectedMethod, setSelectedMethod] = useState<DepositMethod | null>(null);
	const [activeTab, setActiveTab] = useState(0);
	const [isAddMode, setIsAddMode] = useState(false);

	const openEditMethod = (method: DepositMethod) => {
		setSelectedMethod(method);
		setActiveTab(0);
		setIsAddMode(false);
	};

	const openAddMethod = () => {
		setSelectedMethod({
			...withdrawalMethods[0],
			id: 'new-withdrawal',
			name: 'IMPS Transfer',
			provider: 'Razorpay Payout',
			feeValue: '0',
			feeType: 'Fixed Amount',
			apiKey: 'Enter API key',
			secretKey: 'Enter secret key',
			displayPriority: '6'
		});
		setActiveTab(0);
		setIsAddMode(true);
	};

	const closeDialog = () => {
		setSelectedMethod(null);
		setActiveTab(0);
		setIsAddMode(false);
	};

	return (
		<>
			<FusePageSimple
				content={
					<div className="min-h-full bg-[#f8fafc] px-8 py-7 font-['Geist']">
						<div className="mb-6 flex items-start justify-between gap-4">
							<div>
								<Typography className="font-['Geist'] text-[24px] leading-8 font-bold text-[#101828]">
									Withdrawal Management
								</Typography>
								<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">
									Configure withdrawal methods and payout options for different user types
								</Typography>
							</div>
							<Button
								variant="contained"
								startIcon={<FuseSvgIcon size={15}>lucide:plus</FuseSvgIcon>}
								className="h-10 shrink-0 rounded-md bg-[#155dfc] px-4 font-['Geist'] text-[12px] font-semibold text-white shadow-none hover:bg-[#155dfc]"
								onClick={openAddMethod}
							>
								Add Withdrawal Method
							</Button>
						</div>

						<DepositSummaryCards cards={withdrawalSummaryCards} />
						<DepositMethodsTable
							rows={withdrawalMethods}
							title="Withdrawal Methods"
							subtitle="Manage payout methods and withdrawal options"
							successHeader="SUCCESS/FAILED/PENDING"
							onEditMethod={openEditMethod}
						/>
					</div>
				}
			/>

			<EditPaymentMethodDialog
				activeTab={activeTab}
				method={selectedMethod}
				open={Boolean(selectedMethod)}
				title={isAddMode ? 'Add New Withdrawal Method' : 'Edit Withdrawal Method'}
				subtitle="Configure withdrawal method details and user availability"
				submitLabel={isAddMode ? 'Add Method' : 'Update Method'}
				enableDescription="Make this withdrawal method available to users"
				feeCalculationText={(method) =>
					method.feeType === 'Fixed Amount'
						? `INR ${method.feeValue} fixed fee per transaction`
						: `${method.feeValue}% of withdrawal amount will be charged as transaction fee`
				}
				onClose={closeDialog}
				onTabChange={setActiveTab}
			/>
		</>
	);
}

export default WithdrawalManagementView;
