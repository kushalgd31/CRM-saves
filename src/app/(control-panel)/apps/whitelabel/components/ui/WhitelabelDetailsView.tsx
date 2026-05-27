import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { WhitelabelSite } from '../types';

type WhitelabelDetailsViewProps = {
	site: WhitelabelSite;
	onBack: () => void;
};

const financialRows = [
	{
		label: 'Deposits',
		key: 'deposits',
		box: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#008236]',
		icon: 'lucide:dollar-sign'
	},
	{
		label: 'Withdrawals',
		key: 'withdrawals',
		box: 'border-[#fecaca] bg-[#fef2f2] text-[#c10007]',
		icon: 'lucide:dollar-sign'
	},
	{
		label: 'Net Revenue',
		key: 'revenue',
		box: 'border-[#bfdbfe] bg-[#eff6ff] text-[#155dfc]',
		icon: 'lucide:chart-column'
	}
] as const;

const quickActions = [
	{ label: 'Site Settings', icon: 'lucide:settings' },
	{ label: 'Manage Players', icon: 'lucide:users' },
	{ label: 'View Reports', icon: 'lucide:chart-column' },
	{ label: 'Security', icon: 'lucide:shield' }
];

function SiteConfigurationCard({ site, keyPrefix = '' }: { site: WhitelabelSite; keyPrefix?: string }) {
	const fields = [
		{ label: 'SPOC', value: site.spoc },
		{ label: 'Production Domain', value: site.domain, icon: 'lucide:link', color: 'text-[#155dfc]' },
		{ label: 'Support Group', value: site.support },
		{
			label: 'Test Domain',
			value: site.productionDomain || `staging.${site.domain}`,
			icon: 'lucide:link',
			color: 'text-[#f54900]'
		},
		{ label: 'Created On', value: site.created },
		{ label: 'Last Activity', value: `${site.lastDate} ${site.lastTime}` }
	];

	return (
		<div className="rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
			<div className="flex items-center gap-2">
				<FuseSvgIcon
					size={16}
					className="text-[#101828]"
				>
					lucide:settings
				</FuseSvgIcon>
				<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
					Site Configuration
				</Typography>
			</div>
			<div className="mt-6 grid grid-cols-2 gap-x-16 gap-y-[14px]">
				{fields.map((item) => (
					<div key={`${keyPrefix}${item.label}`}>
						<Typography className="font-['Geist'] text-[11px] leading-4 text-[#667085]">
							{item.label}
						</Typography>
						<div className="mt-[2px] flex items-center gap-1">
							{item.icon && (
								<FuseSvgIcon
									size={13}
									className={item.color}
								>
									{item.icon}
								</FuseSvgIcon>
							)}
							<Typography className={`font-['Geist'] text-[14px] leading-5 font-medium ${item.color || 'text-[#101828]'}`}>
								{item.value}
							</Typography>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function EnabledProductsCard({ site, keyPrefix = '' }: { site: WhitelabelSite; keyPrefix?: string }) {
	return (
		<div className="rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
			<div className="flex items-center gap-2">
				<FuseSvgIcon
					size={16}
					className="text-[#101828]"
				>
					lucide:smartphone
				</FuseSvgIcon>
				<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
					Enabled Products
				</Typography>
			</div>
			<div className="mt-[22px] space-y-2">
				{site.products.map((product) => (
					<div
						key={`${keyPrefix}${product}`}
						className="flex h-[30px] items-center justify-between rounded-[3px] bg-[#f8fafc] px-2 text-[14px] font-medium text-[#101828]"
					>
						<span>{product}</span>
						<FuseSvgIcon
							size={15}
							className="text-[#00a63e]"
						>
							lucide:circle-check
						</FuseSvgIcon>
					</div>
				))}
			</div>
		</div>
	);
}

function FinancialOverviewCard({ site, keyPrefix = '' }: { site: WhitelabelSite; keyPrefix?: string }) {
	return (
		<div className="rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
			<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
				Financial Overview
			</Typography>
			<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
				Today's financial activity
			</Typography>
			<div className="mt-[19px] space-y-3">
				{financialRows.map((item) => (
					<div
						key={`${keyPrefix}${item.label}`}
						className={`flex h-[59px] items-center justify-between rounded-[8px] border px-[14px] ${item.box}`}
					>
						<div>
							<Typography className="font-['Geist'] text-[12px] leading-4 font-medium">
								{item.label}
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[21px] leading-6 font-bold">
								{site[item.key]}
							</Typography>
						</div>
						<FuseSvgIcon size={24}>{item.icon}</FuseSvgIcon>
					</div>
				))}
			</div>
		</div>
	);
}

function PlayerActivityCard({ site }: { site: WhitelabelSite }) {
	return (
		<div className="rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
			<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
				Player Activity
			</Typography>
			<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
				User engagement metrics
			</Typography>
			<div className="mt-6">
				<div className="flex items-center justify-between">
					<Typography className="font-['Geist'] text-[12px] leading-4 text-[#4a5565]">
						Active Players
					</Typography>
					<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
						{site.activePlayers} / {site.totalPlayers}
					</Typography>
				</div>
				<div className="mt-[9px] h-[6px] overflow-hidden rounded-full bg-[#e5e7eb]">
					<div
						className="h-full rounded-full bg-[#00a63e]"
						style={{ width: '27.3%' }}
					/>
				</div>
				<Typography className="mt-[5px] font-['Geist'] text-[10px] leading-4 text-[#667085]">
					27.3% active rate
				</Typography>
			</div>
			<div className="mt-[19px] grid grid-cols-2 gap-3">
				<div className="h-[61px] rounded-[8px] border border-[#e9d5ff] bg-[#faf5ff] px-[14px] py-[10px]">
					<Typography className="font-['Geist'] text-[12px] leading-4 text-[#8200db]">Total Bets</Typography>
					<Typography className="mt-1 font-['Geist'] text-[22px] leading-6 font-bold text-[#6e11b0]">
						{site.bets}
					</Typography>
				</div>
				<div className="h-[61px] rounded-[8px] border border-[#bfdbfe] bg-[#eff6ff] px-[14px] py-[10px]">
					<Typography className="font-['Geist'] text-[12px] leading-4 text-[#155dfc]">Avg/Player</Typography>
					<Typography className="mt-1 font-['Geist'] text-[22px] leading-6 font-bold text-[#1c398e]">
						2.6
					</Typography>
				</div>
			</div>
		</div>
	);
}

function DetailSection({ site, keyPrefix = '' }: { site: WhitelabelSite; keyPrefix?: string }) {
	return (
		<>
			<div className="mt-5 grid grid-cols-[2.05fr_1fr] gap-5">
				<SiteConfigurationCard
					site={site}
					keyPrefix={keyPrefix}
				/>
				<EnabledProductsCard
					site={site}
					keyPrefix={keyPrefix}
				/>
			</div>
			<div className="mt-5 grid grid-cols-[1fr_1fr] gap-5">
				<FinancialOverviewCard
					site={site}
					keyPrefix={keyPrefix}
				/>
				<PlayerActivityCard site={site} />
			</div>
		</>
	);
}

function QuickActionsCard() {
	return (
		<div className="mt-5 rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
			<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
				Quick Actions
			</Typography>
			<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
				Manage and configure this whitelabel site
			</Typography>
			<div className="mt-[19px] grid grid-cols-4 gap-3">
				{quickActions.map((action) => (
					<button
						key={action.label}
						type="button"
						className="flex h-[57px] flex-col items-center justify-center gap-2 rounded-[7px] border border-[#e4e7ec] bg-white text-[#101828]"
					>
						<FuseSvgIcon size={14}>{action.icon}</FuseSvgIcon>
						<span className="font-['Geist'] text-[12px] font-medium leading-4">{action.label}</span>
					</button>
				))}
			</div>
		</div>
	);
}

function WhitelabelDetailsView({ site, onBack }: WhitelabelDetailsViewProps) {
	const summaryCards = [
		{
			id: 'players',
			label: 'Total Players',
			value: site.totalPlayers,
			hint: `+${site.activePlayers} active`,
			icon: 'lucide:users-round',
			iconClass: 'text-[#155dfc]',
			valueClass: 'text-[#101828]'
		},
		{
			id: 'bets',
			label: "Today's Bets",
			value: site.bets,
			hint: '',
			icon: 'lucide:trending-up',
			iconClass: 'text-[#9810fa]',
			valueClass: 'text-[#101828]'
		},
		{
			id: 'deposits',
			label: "Today's Deposits",
			value: site.deposits,
			hint: '',
			icon: 'lucide:dollar-sign',
			iconClass: 'text-[#00a63e]',
			valueClass: 'text-[#101828]'
		},
		{
			id: 'revenue',
			label: "Today's Revenue",
			value: site.revenue,
			hint: '',
			icon: 'lucide:chart-column',
			iconClass: 'text-[#155dfc]',
			valueClass: 'text-[#155dfc]'
		}
	];

	return (
		<div className="min-h-full bg-[#f8fafc] px-6 py-4 font-['Geist']">
			<button
				type="button"
				onClick={onBack}
				className="inline-flex h-[28px] items-center gap-2 rounded-md border border-[#eaecf0] bg-white px-3 text-[12px] font-semibold text-[#101828] shadow-sm"
			>
				<FuseSvgIcon size={14}>lucide:arrow-left</FuseSvgIcon>
				Back to List
			</button>

			<div className="mt-3 flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="flex h-[49px] w-[49px] items-center justify-center rounded-md bg-gradient-to-br from-[#2f7cff] to-[#9b5cff] text-white">
						<FuseSvgIcon size={29}>lucide:globe-2</FuseSvgIcon>
					</div>
					<div>
						<Typography className="font-['Geist'] text-[21px] leading-7 font-bold text-[#101828]">
							{site.name}
						</Typography>
						<div className="mt-1 flex flex-wrap items-center gap-2">
							<span className="rounded-[4px] border border-[#e4e7ec] bg-white px-2 py-1 font-mono text-[11px] leading-none text-[#101828]">
								{site.appId}
							</span>
							<span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-medium leading-none text-[#008236]">
								{site.status}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button
						startIcon={<FuseSvgIcon size={13}>lucide:settings</FuseSvgIcon>}
						className="h-[30px] rounded-md border border-[#e4e7ec] bg-white px-3 font-['Geist'] text-[12px] font-medium text-[#101828] shadow-sm hover:bg-white"
					>
						Configure
					</Button>
					<Button
						startIcon={<FuseSvgIcon size={13}>lucide:square-pen</FuseSvgIcon>}
						className="h-[30px] rounded-md bg-[#155dfc] px-3 font-['Geist'] text-[12px] font-medium text-white shadow-none hover:bg-[#155dfc]"
					>
						Edit Details
					</Button>
				</div>
			</div>

			<div className="mt-5 grid grid-cols-4 gap-[13px]">
				{summaryCards.map((card) => (
					<div
						key={card.id}
						className="h-[124px] rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]"
					>
						<FuseSvgIcon
							size={24}
							className={card.iconClass}
						>
							{card.icon}
						</FuseSvgIcon>
						<Typography className={`mt-[13px] font-['Geist'] text-[21px] leading-6 font-bold ${card.valueClass}`}>
							{card.value}
						</Typography>
						<Typography className="mt-1 font-['Geist'] text-[12px] leading-4 text-[#667085]">
							{card.label}
						</Typography>
						{card.hint && (
							<Typography className="mt-[5px] font-['Geist'] text-[11px] leading-4 text-[#00a63e]">
								{card.hint}
							</Typography>
						)}
					</div>
				))}
			</div>

			<DetailSection site={site} />
			<DetailSection
				site={site}
				keyPrefix="lower-"
			/>
			<QuickActionsCard />
		</div>
	);
}

export default WhitelabelDetailsView;
