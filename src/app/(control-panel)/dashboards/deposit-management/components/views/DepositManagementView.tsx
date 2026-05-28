'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { depositMethods, depositSummaryCards } from '../data/depositManagementData';
import { DepositMethod } from '../types';
import DepositMethodsTable from '../ui/DepositMethodsTable';
import DepositSummaryCards from '../ui/DepositSummaryCards';
import EditPaymentMethodDialog from '../ui/EditPaymentMethodDialog';

function DepositManagementView() {
	const [selectedMethod, setSelectedMethod] = useState<DepositMethod | null>(null);
	const [activeTab, setActiveTab] = useState(0);

	const openMethod = (method: DepositMethod) => {
		setSelectedMethod(method);
		setActiveTab(0);
	};

	const closeDialog = () => {
		setSelectedMethod(null);
		setActiveTab(0);
	};

	return (
		<>
			<FusePageSimple
				content={
					<div className="min-h-full bg-[#f8fafc] px-8 py-7 font-['Geist']">
						<div className="mb-6 flex items-start justify-between gap-4">
							<div>
								<Typography className="font-['Geist'] text-[24px] leading-8 font-bold text-[#101828]">
									Deposit Management
								</Typography>
								<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">
									Configure payment gateways and manual deposit methods for different user types
								</Typography>
							</div>
							<Button
								variant="contained"
								startIcon={<FuseSvgIcon size={15}>lucide:plus</FuseSvgIcon>}
								className="h-10 shrink-0 rounded-md bg-[#155dfc] px-4 font-['Geist'] text-[12px] font-semibold text-white shadow-none hover:bg-[#155dfc]"
								onClick={() => openMethod(depositMethods[0])}
							>
								Add Payment Method
							</Button>
						</div>

						<DepositSummaryCards cards={depositSummaryCards} />
						<DepositMethodsTable
							rows={depositMethods}
							onEditMethod={openMethod}
						/>
					</div>
				}
			/>

			<EditPaymentMethodDialog
				activeTab={activeTab}
				method={selectedMethod}
				open={Boolean(selectedMethod)}
				onClose={closeDialog}
				onTabChange={setActiveTab}
			/>
		</>
	);
}

export default DepositManagementView;
