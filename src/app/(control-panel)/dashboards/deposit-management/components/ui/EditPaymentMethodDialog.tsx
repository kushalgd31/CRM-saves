import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { DepositMethod } from '../types';

type EditPaymentMethodDialogProps = {
	activeTab: number;
	method: DepositMethod | null;
	open: boolean;
	onClose: () => void;
	onTabChange: (tab: number) => void;
	title?: string;
	subtitle?: string;
	submitLabel?: string;
	enableTitle?: string;
	enableDescription?: string;
	feeCalculationText?: (method: DepositMethod) => string;
};

const tabs = ['Basic Info', 'Limits & Fees', 'Configuration'];

const switchSx = {
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#020617'
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#020617',
		opacity: 1
	}
};

function Field({
	label,
	value,
	required,
	select
}: {
	label: string;
	value: string;
	required?: boolean;
	select?: boolean;
}) {
	return (
		<div>
			<label className="mb-1.5 block font-['Geist'] text-[12px] leading-4 font-semibold text-[#101828]">
				{label}
				{required ? ' *' : ''}
			</label>
			<div className="flex h-9 items-center justify-between rounded-lg bg-[#f0f0f2] px-3 font-['Geist'] text-[12px] leading-4 text-[#101828]">
				<span>{value}</span>
				{select && (
					<FuseSvgIcon
						size={13}
						className="text-[#9aa1ad]"
					>
						lucide:chevron-down
					</FuseSvgIcon>
				)}
			</div>
		</div>
	);
}

function EditPaymentMethodDialog({
	activeTab,
	method,
	open,
	onClose,
	onTabChange,
	title = 'Edit Payment Method',
	subtitle = 'Configure payment method details and user availability',
	submitLabel = 'Update Method',
	enableTitle = 'Enable this method',
	enableDescription = 'Make this payment method available to users',
	feeCalculationText = (methodValue) =>
		`${methodValue.feeValue}% of deposit amount will be charged as transaction fee`
}: EditPaymentMethodDialogProps) {
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
			<div className="flex h-full flex-col bg-white font-['Geist'] text-[#101828]">
				<div className="border-b border-[#eaecf0] px-6 pt-5 pb-4">
					<div className="flex items-start justify-between">
						<div>
							<Typography className="font-['Geist'] text-[20px] leading-7 font-bold text-[#101828]">
								{title}
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#667085]">
								{subtitle}
							</Typography>
						</div>
						<IconButton
							onClick={onClose}
							size="small"
							aria-label="Close edit payment method"
							className="text-[#98a2b3] hover:text-[#344054]"
						>
							<FuseSvgIcon size={18}>lucide:x</FuseSvgIcon>
						</IconButton>
					</div>

					<div className="mt-5 flex h-10 rounded-xl bg-[#f1f2f5] p-1">
						{tabs.map((tab, index) => (
							<button
								key={tab}
								type="button"
								onClick={() => onTabChange(index)}
								className={`flex-1 rounded-lg font-['Geist'] text-[13px] font-semibold transition-all ${
									activeTab === index
										? 'bg-white text-[#101828] shadow-sm'
										: 'text-[#667085] hover:text-[#344054]'
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				<div className="flex-1 overflow-y-auto px-6 py-6">
					{activeTab === 0 && method && (
						<div className="space-y-5">
							<div className="grid grid-cols-2 gap-5">
								<Field
									label="Method Name"
									value={method.name}
									required
								/>
								<Field
									label="Provider"
									value={method.provider}
								/>
								<Field
									label="Type"
									value={
										method.typeLabel ??
										(method.type === 'Gateway'
											? 'Payment Gateway'
											: method.type === 'Auto'
												? 'Automatic Payout'
												: 'Manual')
									}
									required
									select
								/>
								<Field
									label="Icon"
									value={
										method.iconLabel ??
										(method.type === 'Auto'
											? 'Bank'
											: method.type === 'Gateway'
												? 'Credit Card'
												: 'Wallet')
									}
									select
								/>
								<Field
									label="Currency"
									value={method.currency}
									select
								/>
								<Field
									label="Processing Time"
									value={method.processingTime}
								/>
							</div>
							<Field
								label="User Availability"
								value={method.userAvailability}
								required
								select
							/>
							<div className="mt-4 flex h-12 items-center justify-between rounded-lg border border-[#eaecf0] px-3">
								<div>
									<Typography className="font-['Geist'] text-[12px] leading-4 font-medium text-[#101828]">
										{enableTitle}
									</Typography>
									<Typography className="font-['Geist'] text-[10px] leading-3 text-[#667085]">
										{enableDescription}
									</Typography>
								</div>
								<Switch
									checked={method.enabled}
									size="small"
									sx={switchSx}
								/>
							</div>
						</div>
					)}

					{activeTab === 1 && method && (
						<div className="space-y-5">
							<div className="grid grid-cols-2 gap-5">
								<Field
									label="Minimum Amount (INR)"
									value={method.minAmount}
								/>
								<Field
									label="Maximum Amount (INR)"
									value={method.maxAmount}
								/>
								<Field
									label="Fee"
									value={method.feeValue}
								/>
								<Field
									label="Fee Type"
									value={method.feeType}
									select
								/>
							</div>
							<div className="rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-3 py-3">
								<Typography className="font-['Geist'] text-[12px] leading-4 font-bold text-[#155dfc]">
									Fee Calculation
								</Typography>
								<Typography className="mt-2 font-['Geist'] text-[11px] leading-4 text-[#155dfc]">
									{feeCalculationText(method)}
								</Typography>
							</div>
						</div>
					)}

					{activeTab === 2 && method && (
						<div className="space-y-5">
							<Field
								label="API Key / Merchant ID"
								value={method.apiKey || 'Manual method'}
							/>
							<Field
								label="Secret Key / API Secret"
								value={method.secretKey || 'Manual method'}
							/>
							<div className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] px-3 py-3">
								<Typography className="font-['Geist'] text-[11px] leading-4 text-[#c2410c]">
									<span className="font-bold">Security Note:</span> API keys and secrets are encrypted
									and stored securely. Never share these credentials.
								</Typography>
							</div>
							<Field
								label="Display Priority"
								value={method.displayPriority}
							/>
							<Typography className="font-['Geist'] text-[10px] leading-3 text-[#667085]">
								Lower numbers appear first (1 = highest priority)
							</Typography>
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
						onClick={onClose}
						className="h-10 rounded-lg bg-[#155dfc] px-5 font-['Geist'] text-[13px] font-semibold text-white shadow-none hover:bg-[#1249d6]"
					>
						{submitLabel}
					</Button>
				</div>
			</div>
		</Dialog>
	);
}

export default EditPaymentMethodDialog;
