import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ProductOption, WhitelabelFormData } from '../types';

type CreateWhitelabelDialogProps = {
	activeTab: number;
	formData: WhitelabelFormData;
	open: boolean;
	productOptions: ProductOption[];
	selectedProducts: string[];
	onClose: () => void;
	onFormDataChange: (formData: WhitelabelFormData) => void;
	onTabChange: (tab: number) => void;
	onToggleProduct: (productId: string) => void;
};

function CreateWhitelabelDialog({
	activeTab,
	formData,
	open,
	productOptions,
	selectedProducts,
	onClose,
	onFormDataChange,
	onTabChange,
	onToggleProduct
}: CreateWhitelabelDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={false}
			slotProps={{
				paper: {
					className:
						'm-0 ml-auto h-full max-h-none w-full max-w-[560px] overflow-hidden rounded-l-[28px] rounded-r-none bg-white shadow-2xl'
				}
			}}
		>
			<div className="flex h-full flex-col bg-white font-['Geist']">
				<div className="border-b border-[#eaecf0] px-6 pt-5 pb-4">
					<div className="flex items-start justify-between">
						<div>
							<Typography className="font-['Geist'] text-[20px] leading-7 font-bold text-[#101828]">
								Create New Whitelabel Site
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#667085]">
								Configure your whitelabel site details and products
							</Typography>
						</div>
						<IconButton
							onClick={onClose}
							className="text-[#98a2b3] hover:text-[#344054]"
							size="small"
							aria-label="Close create popup"
						>
							<FuseSvgIcon size={18}>lucide:x</FuseSvgIcon>
						</IconButton>
					</div>

					<div className="mt-5 flex h-10 rounded-xl bg-[#f1f2f5] p-1">
						{['Basic Information', 'Products & Features'].map((tab, index) => (
							<button
								key={tab}
								type="button"
								className={`flex-1 rounded-lg text-[13px] font-semibold transition-all ${activeTab === index
									? 'bg-white text-[#101828] shadow-sm'
									: 'text-[#667085] hover:text-[#344054]'
									}`}
								onClick={() => onTabChange(index)}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				<div className="flex-1 overflow-y-auto px-6 py-6">
					{activeTab === 0 && (
						<div className="space-y-5">
							<div>
								<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
									Whitelabel Name <span className="text-[#f04438]">*</span>
								</label>
								<input
									type="text"
									placeholder="e.g., BetMaster Pro"
									value={formData.name}
									onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
									className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
								/>
							</div>

							<div className="grid grid-cols-2 gap-5">
								<div>
									<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
										SPOC (Single Point of Contact) <span className="text-[#f04438]">*</span>
									</label>
									<input
										type="text"
										placeholder="e.g., John Doe"
										value={formData.spoc}
										onChange={(e) => onFormDataChange({ ...formData, spoc: e.target.value })}
										className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
									/>
								</div>
								<div>
									<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
										Support Group <span className="text-[#f04438]">*</span>
									</label>
									<input
										type="text"
										placeholder="e.g., support@example.com"
										value={formData.supportGroup}
										onChange={(e) => onFormDataChange({ ...formData, supportGroup: e.target.value })}
										className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-5">
								<div>
									<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
										Production Domain <span className="text-[#f04438]">*</span>
									</label>
									<input
										type="text"
										placeholder="e.g., example.com"
										value={formData.productionDomain}
										onChange={(e) => onFormDataChange({ ...formData, productionDomain: e.target.value })}
										className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
									/>
								</div>
								<div>
									<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
										Test Domain <span className="text-[#f04438]">*</span>
									</label>
									<input
										type="text"
										placeholder="e.g., staging.example.com"
										value={formData.testDomain}
										onChange={(e) => onFormDataChange({ ...formData, testDomain: e.target.value })}
										className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
									/>
								</div>
							</div>

							<div className="rounded-xl border border-[#d0d5ff] bg-[#eff2ff] px-4 py-4">
								<Typography className="font-['Geist'] text-[14px] font-semibold leading-5 text-[#101828]">
									Auto-Generated APP ID
								</Typography>
								<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#667085]">
									Your APP ID will be generated automatically based on your whitelabel name
								</Typography>
							</div>
						</div>
					)}

					{activeTab === 1 && (
						<div>
							<Typography className="font-['Geist'] text-[15px] font-semibold leading-5 text-[#101828]">
								Select Products <span className="text-[#f04438]">*</span>
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#667085]">
								Choose which products will be available on this whitelabel site
							</Typography>

							<div className="mt-5 grid grid-cols-2 gap-3">
								{productOptions.map((product) => {
									const isSelected = selectedProducts.includes(product.id);

									return (
										<button
											key={product.id}
											type="button"
											onClick={() => onToggleProduct(product.id)}
											className={`relative flex h-[64px] items-center gap-3 rounded-xl border px-4 text-left transition-all ${isSelected
												? 'border-[#155dfc] bg-[#eff6ff]'
												: 'border-[#e4e7ec] bg-white hover:border-[#d0d5dd] hover:bg-[#f9fafb]'
												}`}
										>
											<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8fafc] text-[18px] leading-none">
												{product.icon}
											</span>
											<span className="text-[14px] font-semibold text-[#101828]">{product.name}</span>
											{isSelected && (
												<span className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[#155dfc]">
													<FuseSvgIcon size={18}>lucide:circle-check</FuseSvgIcon>
												</span>
											)}
										</button>
									);
								})}
							</div>

							{selectedProducts.length > 0 && (
								<div className="mt-5 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-4">
									<Typography className="font-['Geist'] text-[13px] font-semibold leading-5 text-[#101828]">
										Selected Products
									</Typography>
									<div className="mt-2 flex flex-wrap gap-2">
										{selectedProducts.map((productId) => {
											const product = productOptions.find((item) => item.id === productId);

											return (
												<span
													key={productId}
													className="rounded-full bg-[#00a63e] px-3 py-1 text-[11px] font-semibold leading-4 text-white"
												>
													{product?.name}
												</span>
											);
										})}
									</div>
								</div>
							)}
						</div>
					)}
				</div>

				<div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
					<Button
						variant="outlined"
						onClick={onClose}
						className="h-10 rounded-lg border-[#d0d5dd] px-5 font-['Geist'] text-[13px] font-semibold text-[#344054] shadow-none hover:bg-[#f9fafb]"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						className="h-10 rounded-lg bg-[#155dfc] px-5 font-['Geist'] text-[13px] font-semibold text-white shadow-none hover:bg-[#1249d6]"
					>
						Create Whitelabel
					</Button>
				</div>
			</div>
		</Dialog>
	);
}

export default CreateWhitelabelDialog;
