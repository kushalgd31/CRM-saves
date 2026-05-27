'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { productOptions, whitelabelMetrics, whitelabelRows } from '../data/whitelabelMockData';
import CreateWhitelabelDialog from '../ui/CreateWhitelabelDialog';
import WhitelabelDetailsView from '../ui/WhitelabelDetailsView';
import WhitelabelSitesTable from '../ui/WhitelabelSitesTable';
import WhitelabelSummaryCards from '../ui/WhitelabelSummaryCards';
import { WhitelabelFormData, WhitelabelSite } from '../types';

const defaultSelectedProducts = ['casino', 'matka'];
const emptyFormData: WhitelabelFormData = {
	name: '',
	spoc: '',
	supportGroup: '',
	productionDomain: '',
	testDomain: ''
};

function WhitelabelManagementView() {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [selectedSite, setSelectedSite] = useState<WhitelabelSite | null>(null);
	const [activeTab, setActiveTab] = useState(0);
	const [selectedProducts, setSelectedProducts] = useState<string[]>(defaultSelectedProducts);
	const [formData, setFormData] = useState<WhitelabelFormData>(emptyFormData);

	const handleToggleProduct = (productId: string) => {
		setSelectedProducts((prev) =>
			prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
		);
	};

	const handleCloseCreate = () => {
		setIsCreateOpen(false);
		setActiveTab(0);
		setSelectedProducts(defaultSelectedProducts);
		setFormData(emptyFormData);
	};

	return (
		<>
			<FusePageSimple
				content={
					selectedSite ? (
						<WhitelabelDetailsView
							site={selectedSite}
							onBack={() => setSelectedSite(null)}
						/>
					) : (
						<div className="min-h-full bg-[#f8fafc] px-8 py-7 font-['Geist']">
							<div className="mb-6 flex items-start justify-between">
								<div>
									<Typography className="font-['Geist'] text-[24px] leading-8 font-bold text-[#101828]">
										Whitelabel Management
									</Typography>
									<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">
										Create and manage whitelabel sites with custom branding
									</Typography>
								</div>
								<Button
									variant="contained"
									startIcon={<FuseSvgIcon size={15}>lucide:plus</FuseSvgIcon>}
									className="h-10 rounded-md bg-[#155dfc] px-4 font-['Geist'] text-[12px] font-semibold text-white shadow-none hover:bg-[#155dfc]"
									onClick={() => setIsCreateOpen(true)}
								>
									Create Whitelabel
								</Button>
							</div>

							<WhitelabelSummaryCards metrics={whitelabelMetrics} />
							<WhitelabelSitesTable
								rows={whitelabelRows}
								onViewSite={setSelectedSite}
							/>
						</div>
					)
				}
			/>

			<CreateWhitelabelDialog
				activeTab={activeTab}
				formData={formData}
				open={isCreateOpen}
				productOptions={productOptions}
				selectedProducts={selectedProducts}
				onClose={handleCloseCreate}
				onFormDataChange={setFormData}
				onTabChange={setActiveTab}
				onToggleProduct={handleToggleProduct}
			/>
		</>
	);
}

export default WhitelabelManagementView;
