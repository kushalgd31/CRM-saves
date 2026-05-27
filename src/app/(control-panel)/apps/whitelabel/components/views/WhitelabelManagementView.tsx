'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { type MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import DataTable from 'src/components/data-table/DataTable';
import HeirCard from '../../../academy/components/ui/HeirCard';

type ProductOption = {
	id: string;
	name: string;
	icon: string;
};

const productOptions: ProductOption[] = [
	{ id: 'casino', name: 'Casino', icon: '🎰' },
	{ id: 'sports', name: 'Sports', icon: '⚽' },
	{ id: 'matka', name: 'Matka', icon: '🎲' },
	{ id: 'conversation', name: 'Conversation', icon: '💬' },
	{ id: 'poker', name: 'Poker', icon: '🃏' },
	{ id: 'lottery', name: 'Lottery', icon: '🎟️' }
];

type WhitelabelMetric = {
	title: string;
	value: number | string;
	label: string;
	color: string;
};

type WhitelabelSite = {
	id: string;
	name: string;
	spoc: string;
	support: string;
	domain: string;
	productionDomain?: string;
	appId: string;
	products: string[];
	totalPlayers: string;
	activePlayers: string;
	bets: string;
	deposits: string;
	withdrawals: string;
	revenue: string;
	lastDate: string;
	lastTime: string;
	created: string;
	status: 'Active' | 'Inactive';
};

const metrics: WhitelabelMetric[] = [
	{ title: 'Total Whitelabels', value: 5, label: 'Total Whitelabels', color: 'inherit' },
	{ title: 'Active Sites', value: 3, label: 'Active Sites', color: 'success' },
	{ title: 'Total Players', value: '47,819', label: 'Total Players', color: 'primary' },
	{ title: 'Active Players', value: '10,356', label: 'Active Players', color: 'secondary' }
];

const rows: WhitelabelSite[] = [
	{
		id: '1',
		name: 'BetMaster Pro',
		spoc: 'John Doe',
		support: 'support@betmaster.com',
		domain: 'betmaster.com',
		appId: 'WL-BMP-2024-A1B2C3',
		products: ['Casino', 'Sports', 'Matka'],
		totalPlayers: '12,543',
		activePlayers: '3,421',
		bets: '8,934',
		deposits: '₹45,23,450',
		withdrawals: '₹23,12,300',
		revenue: '₹22,11,150',
		lastDate: '2024-05-24',
		lastTime: '15:30:00',
		created: '2024-01-15',
		status: 'Active'
	},
	{
		id: '2',
		name: 'WinZone Gaming',
		spoc: 'Sarah Miller',
		support: 'help@winzone.io',
		domain: 'winzone.io',
		appId: 'WL-WZG-2024-D4E5F6',
		products: ['Casino', 'Sports', 'Conversation'],
		totalPlayers: '8,721',
		activePlayers: '2,134',
		bets: '5,623',
		deposits: '₹28,45,200',
		withdrawals: '₹15,67,800',
		revenue: '₹12,77,400',
		lastDate: '2024-05-24',
		lastTime: '14:45:00',
		created: '2024-02-20',
		status: 'Active'
	},
	{
		id: '3',
		name: 'Lucky7 Casino',
		spoc: 'Mike Johnson',
		support: 'support@lucky7.bet',
		domain: 'lucky7.bet',
		appId: 'WL-L7C-2024-G7H8I9',
		products: ['Casino', 'Matka'],
		totalPlayers: '4,532',
		activePlayers: '234',
		bets: '892',
		deposits: '₹5,43,100',
		withdrawals: '₹3,21,400',
		revenue: '₹2,21,700',
		lastDate: '2024-05-20',
		lastTime: '10:15:00',
		created: '2024-03-10',
		status: 'Inactive'
	},
	{
		id: '4',
		name: 'SportsPro Hub',
		spoc: 'Emma Davis',
		support: 'contact@sportspro.com',
		domain: 'sportspro.com',
		appId: 'WL-SPH-2024-J1K2L3',
		products: ['Sports', 'Conversation'],
		totalPlayers: '15,234',
		activePlayers: '4,567',
		bets: '12,456',
		deposits: '₹67,89,300',
		withdrawals: '₹34,56,200',
		revenue: '₹33,33,100',
		lastDate: '2024-05-24',
		lastTime: '16:20:00',
		created: '2024-04-05',
		status: 'Active'
	}
];

function splitAppId(appId: string) {
	const parts = appId.split('-');
	return parts.length > 3 ? `${parts[0]}-${parts[1]}-${parts[2]}-${parts.slice(3).join('')}` : appId;
}

function WhitelabelManagementView() {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [selectedSite, setSelectedSite] = useState<WhitelabelSite | null>(null);
	const [activeTab, setActiveTab] = useState(0);
	const [selectedProducts, setSelectedProducts] = useState<string[]>(['casino', 'matka']);
	const [formData, setFormData] = useState({
		name: '',
		spoc: '',
		supportGroup: '',
		productionDomain: '',
		testDomain: ''
	});

	const handleToggleProduct = (productId: string) => {
		setSelectedProducts((prev) =>
			prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
		);
	};

	const handleCloseCreate = () => {
		setIsCreateOpen(false);
		setActiveTab(0);
		setSelectedProducts(['casino', 'matka']);
		setFormData({ name: '', spoc: '', supportGroup: '', productionDomain: '', testDomain: '' });
	};

	const columns = useMemo<MRT_ColumnDef<WhitelabelSite>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'SITE DETAILS',
				size: 210,
				Cell: ({ row }) => (
					<div className="flex gap-2">
						<FuseSvgIcon
							size={16}
							className="mt-0.5 text-[#155dfc]"
						>
							lucide:globe
						</FuseSvgIcon>
						<div>
							<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
								{row.original.name}
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
								SPOC: {row.original.spoc}
							</Typography>
							<Typography className="font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
								Support: {row.original.support}
							</Typography>
							<Typography className="font-['Geist'] text-[11px] leading-4 text-[#155dfc]">
								{row.original.domain}
							</Typography>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'appId',
				header: 'APP ID',
				size: 120,
				Cell: ({ row }) => (
					<div className="flex items-center gap-2">
						<span className="rounded-md bg-[#f2f4f7] px-2 py-2 font-['Geist'] text-[11px] leading-4 text-[#101828]">
							{splitAppId(row.original.appId)}
						</span>
						<FuseSvgIcon
							size={15}
							className="text-[#4A5565]"
						>
							lucide:copy
						</FuseSvgIcon>
					</div>
				)
			},
			{
				accessorKey: 'products',
				header: 'PRODUCTS',
				size: 120,
				Cell: ({ row }) => (
					<div className="flex flex-col items-start gap-1">
						{row.original.products.map((product) => (
							<span
								key={product}
								className="rounded-full border border-[#d0d5dd] bg-white px-2 py-0.5 font-['Geist'] text-[11px] leading-4 text-[#101828]"
							>
								{product}
							</span>
						))}
					</div>
				)
			},
			{
				accessorKey: 'totalPlayers',
				header: 'PLAYERS',
				size: 120,
				Cell: ({ row }) => (
					<div className="flex w-[86px] flex-col gap-3 font-['Geist']">
						<div className="grid grid-cols-[18px_1fr] items-start gap-2">
							<FuseSvgIcon
								size={16}
								className="mt-0.5 text-[#4A5565]"
							>
								lucide:users
							</FuseSvgIcon>
							<div className="text-left">
								<Typography className="font-['Geist'] text-[13px] leading-4 font-bold text-[#101828]">
									{row.original.totalPlayers}
								</Typography>
								<Typography className="font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
									Total
								</Typography>
							</div>
						</div>
						<div className="grid grid-cols-[18px_1fr] items-start gap-2">
							<FuseSvgIcon
								size={16}
								className="mt-0.5 text-[#00a63e]"
							>
								lucide:activity
							</FuseSvgIcon>
							<div className="text-left">
								<Typography className="font-['Geist'] text-[13px] leading-4 font-bold text-[#00a63e]">
									{row.original.activePlayers}
								</Typography>
								<Typography className="font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
									Active
								</Typography>
							</div>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'bets',
				header: "TODAY'S ACTIVITY",
				size: 180,
				Cell: ({ row }) => (
					<div className="space-y-1 font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
						<p>
							<span className="mr-1 text-[#155dfc]">↗</span>Bets:{' '}
							<span className="font-bold text-[#101828]">{row.original.bets}</span>
						</p>
						<p>
							<span className="mr-1 text-[#00a63e]">$</span>Deposits:{' '}
							<span className="font-bold text-[#00a63e]">{row.original.deposits}</span>
						</p>
						<p>
							<span className="mr-1 text-[#fb2c36]">$</span>Withdrawals:{' '}
							<span className="font-bold text-[#fb2c36]">{row.original.withdrawals}</span>
						</p>
						<p className="pt-1">
							Revenue: <span className="font-bold text-[#155dfc]">{row.original.revenue}</span>
						</p>
					</div>
				)
			},
			{
				accessorKey: 'lastDate',
				header: 'LAST ACTIVITY',
				size: 130,
				Cell: ({ row }) => (
					<div className="w-[104px] font-['Geist'] text-[11px] leading-4 text-[#4A5565]">
						<div className="grid grid-cols-[16px_1fr] items-start gap-2 text-[#101828]">
							<FuseSvgIcon
								size={13}
								className="mt-0.5 text-[#4A5565]"
							>
								lucide:clock-3
							</FuseSvgIcon>
							<div className="text-left">
								<p className="font-bold">{row.original.lastDate}</p>
								<p>{row.original.lastTime}</p>
							</div>
						</div>
						<div className="mt-3 grid grid-cols-[16px_1fr] gap-2">
							<span />
							<div className="text-left">
								<p>Created:</p>
								<p>{row.original.created}</p>
							</div>
						</div>
					</div>
				)
			},
			{
				accessorKey: 'status',
				header: 'STATUS',
				size: 115,
				Cell: ({ row }) => (
					<span
						className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-['Geist'] text-[11px] font-semibold ${row.original.status === 'Active'
							? 'bg-[#dcfce7] text-[#008236]'
							: 'bg-[#f1f5f9] text-[#4A5565]'
							}`}
					>
						<FuseSvgIcon size={12}>
							{row.original.status === 'Active' ? 'lucide:circle-check' : 'lucide:circle-x'}
						</FuseSvgIcon>
						{row.original.status}
					</span>
				)
			}
		],
		[] 
	);

	const renderWhitelabelDetails = () => (
		<div className="min-h-full bg-[#f8fafc] px-6 py-4 font-['Geist']">
			<button
				type="button"
				onClick={() => setSelectedSite(null)}
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
							{selectedSite?.name}
						</Typography>
						<div className="mt-1 flex flex-wrap items-center gap-2">
							<span className="rounded-[4px] border border-[#e4e7ec] bg-white px-2 py-1 font-mono text-[11px] leading-none text-[#101828]">
								{selectedSite?.appId}
							</span>
							<span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-medium leading-none text-[#008236]">
								{selectedSite?.status}
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
				{[
					{
						id: 'players',
						label: 'Total Players',
						value: selectedSite?.totalPlayers,
						hint: `+${selectedSite?.activePlayers} active`,
						icon: 'lucide:users-round',
						iconClass: 'text-[#155dfc]',
						valueClass: 'text-[#101828]'
					},
					{
						id: 'bets',
						label: "Today's Bets",
						value: selectedSite?.bets,
						hint: '',
						icon: 'lucide:trending-up',
						iconClass: 'text-[#9810fa]',
						valueClass: 'text-[#101828]'
					},
					{
						id: 'deposits',
						label: "Today's Deposits",
						value: selectedSite?.deposits,
						hint: '',
						icon: 'lucide:dollar-sign',
						iconClass: 'text-[#00a63e]',
						valueClass: 'text-[#101828]'
					},
					{
						id: 'revenue',
						label: "Today's Revenue",
						value: selectedSite?.revenue,
						hint: '',
						icon: 'lucide:chart-column',
						iconClass: 'text-[#155dfc]',
						valueClass: 'text-[#155dfc]'
					}
				].map((card) => (
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

			<div className="mt-5 grid grid-cols-[2.05fr_1fr] gap-5">
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
						{[
							{ label: 'SPOC', value: selectedSite?.spoc },
							{ label: 'Production Domain', value: selectedSite?.domain, icon: 'lucide:link', color: 'text-[#155dfc]' },
							{ label: 'Support Group', value: selectedSite?.support },
							{
								label: 'Test Domain',
								value: selectedSite?.productionDomain || `staging.${selectedSite?.domain}`,
								icon: 'lucide:link',
								color: 'text-[#f54900]'
							},
							{ label: 'Created On', value: selectedSite?.created },
							{ label: 'Last Activity', value: `${selectedSite?.lastDate} ${selectedSite?.lastTime}` }
						].map((item) => (
							<div key={item.label}>
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
						{selectedSite?.products?.map((product) => (
							<div
								key={product}
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
			</div>

			<div className="mt-5 grid grid-cols-[1fr_1fr] gap-5">
				<div className="rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
					<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
						Financial Overview
					</Typography>
					<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
						Today's financial activity
					</Typography>
					<div className="mt-[19px] space-y-3">
						{[
							{
								label: 'Deposits',
								value: selectedSite?.deposits,
								box: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#008236]',
								icon: 'lucide:dollar-sign'
							},
							{
								label: 'Withdrawals',
								value: selectedSite?.withdrawals,
								box: 'border-[#fecaca] bg-[#fef2f2] text-[#c10007]',
								icon: 'lucide:dollar-sign'
							},
							{
								label: 'Net Revenue',
								value: selectedSite?.revenue,
								box: 'border-[#bfdbfe] bg-[#eff6ff] text-[#155dfc]',
								icon: 'lucide:chart-column'
							}
						].map((item) => (
							<div
								key={item.label}
								className={`flex h-[59px] items-center justify-between rounded-[8px] border px-[14px] ${item.box}`}
							>
								<div>
									<Typography className="font-['Geist'] text-[12px] leading-4 font-medium">
										{item.label}
									</Typography>
									<Typography className="mt-1 font-['Geist'] text-[21px] leading-6 font-bold">
										{item.value}
									</Typography>
								</div>
								<FuseSvgIcon size={24}>{item.icon}</FuseSvgIcon>
							</div>
						))}
					</div>
				</div>

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
								{selectedSite?.activePlayers} / {selectedSite?.totalPlayers}
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
							<Typography className="font-['Geist'] text-[12px] leading-4 text-[#8200db]">
								Total Bets
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[22px] leading-6 font-bold text-[#6e11b0]">
								{selectedSite?.bets}
							</Typography>
						</div>
						<div className="h-[61px] rounded-[8px] border border-[#bfdbfe] bg-[#eff6ff] px-[14px] py-[10px]">
							<Typography className="font-['Geist'] text-[12px] leading-4 text-[#155dfc]">
								Avg/Player
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[22px] leading-6 font-bold text-[#1c398e]">
								2.6
							</Typography>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-5 grid grid-cols-[2.05fr_1fr] gap-5">
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
						{[
							{ label: 'SPOC', value: selectedSite?.spoc },
							{ label: 'Production Domain', value: selectedSite?.domain, icon: 'lucide:link', color: 'text-[#155dfc]' },
							{ label: 'Support Group', value: selectedSite?.support },
							{
								label: 'Test Domain',
								value: selectedSite?.productionDomain || `staging.${selectedSite?.domain}`,
								icon: 'lucide:link',
								color: 'text-[#f54900]'
							},
							{ label: 'Created On', value: selectedSite?.created },
							{ label: 'Last Activity', value: `${selectedSite?.lastDate} ${selectedSite?.lastTime}` }
						].map((item) => (
							<div key={`lower-${item.label}`}>
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
						{selectedSite?.products?.map((product) => (
							<div
								key={`lower-${product}`}
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
			</div>

			<div className="mt-5 grid grid-cols-[1fr_1fr] gap-5">
				<div className="rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
					<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
						Financial Overview
					</Typography>
					<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
						Today's financial activity
					</Typography>
					<div className="mt-[19px] space-y-3">
						{[
							{
								label: 'Deposits',
								value: selectedSite?.deposits,
								box: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#008236]',
								icon: 'lucide:dollar-sign'
							},
							{
								label: 'Withdrawals',
								value: selectedSite?.withdrawals,
								box: 'border-[#fecaca] bg-[#fef2f2] text-[#c10007]',
								icon: 'lucide:dollar-sign'
							},
							{
								label: 'Net Revenue',
								value: selectedSite?.revenue,
								box: 'border-[#bfdbfe] bg-[#eff6ff] text-[#155dfc]',
								icon: 'lucide:chart-column'
							}
						].map((item) => (
							<div
								key={`lower-${item.label}`}
								className={`flex h-[59px] items-center justify-between rounded-[8px] border px-[14px] ${item.box}`}
							>
								<div>
									<Typography className="font-['Geist'] text-[12px] leading-4 font-medium">
										{item.label}
									</Typography>
									<Typography className="mt-1 font-['Geist'] text-[21px] leading-6 font-bold">
										{item.value}
									</Typography>
								</div>
								<FuseSvgIcon size={24}>{item.icon}</FuseSvgIcon>
							</div>
						))}
					</div>
				</div>

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
								{selectedSite?.activePlayers} / {selectedSite?.totalPlayers}
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
							<Typography className="font-['Geist'] text-[12px] leading-4 text-[#8200db]">
								Total Bets
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[22px] leading-6 font-bold text-[#6e11b0]">
								{selectedSite?.bets}
							</Typography>
						</div>
						<div className="h-[61px] rounded-[8px] border border-[#bfdbfe] bg-[#eff6ff] px-[14px] py-[10px]">
							<Typography className="font-['Geist'] text-[12px] leading-4 text-[#155dfc]">
								Avg/Player
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[22px] leading-6 font-bold text-[#1c398e]">
								2.6
							</Typography>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-5 rounded-[10px] border border-[#e4e7ec] bg-white px-[18px] py-[17px]">
				<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
					Quick Actions
				</Typography>
				<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
					Manage and configure this whitelabel site
				</Typography>
				<div className="mt-[19px] grid grid-cols-4 gap-3">
					{[
						{ label: 'Site Settings', icon: 'lucide:settings' },
						{ label: 'Manage Players', icon: 'lucide:users' },
						{ label: 'View Reports', icon: 'lucide:chart-column' },
						{ label: 'Security', icon: 'lucide:shield' }
					].map((action) => (
						<button
							key={`lower-${action.label}`}
							type="button"
							className="flex h-[57px] flex-col items-center justify-center gap-2 rounded-[7px] border border-[#e4e7ec] bg-white text-[#101828]"
						>
							<FuseSvgIcon size={14}>{action.icon}</FuseSvgIcon>
							<span className="font-['Geist'] text-[12px] font-medium leading-4">{action.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<>
			<FusePageSimple
				content={
					selectedSite ? (
						renderWhitelabelDetails()
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
								className="h-10 rounded-lg bg-[#155dfc] px-4 font-['Geist'] text-[12px] font-semibold text-white shadow-none hover:bg-[#155dfc]"
								onClick={() => setIsCreateOpen(true)}
							>
								Create Whitelabel
							</Button>
						</div>

						<div className="mb-6 grid grid-cols-4 gap-4">
							{metrics.map((metric) => (
								<HeirCard
									key={metric.title}
									title=""
									variant="compact"
									data={{
										count: metric.value,
										name: metric.label,
										color: metric.color
									}}
								/>
							))}
						</div>

						<Paper
							className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-none"
							elevation={0}
						>
							<div className="px-5 pt-5 pb-4">
								<Typography className="font-['Geist'] text-[15px] leading-5 font-semibold text-[#101828]">
									Whitelabel Sites
								</Typography>
								<Typography className="mt-2 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">
									Manage all whitelabel sites and monitor their performance
								</Typography>
							</div>
							<div className="px-5 pb-5">
								<DataTable
									data={rows}
									columns={columns}
									enableTopToolbar={false}
									enableBottomToolbar={false}
									enablePagination={false}
									enableRowSelection={false}
									enableExpanding={false}
									enableRowNumbers={false}
									enableColumnActions={false}
									enableColumnFilters={false}
									enableColumnOrdering={false}
									enableGrouping={false}
									enableColumnPinning={false}
									renderRowActionMenuItems={() => []}
									renderRowActions={({ row }) => (
										<div className="flex items-center justify-center gap-6 pr-1 text-[#155dfc]">
											<button
												type="button"
												onClick={() => setSelectedSite(row.original)}
												aria-label="View whitelabel"
											>
												<FuseSvgIcon size={15}>lucide:eye</FuseSvgIcon>
											</button>
											<button
												type="button"
												aria-label="Edit whitelabel"
											className="text-[#667085]"
											>
												<FuseSvgIcon size={15}>lucide:square-pen</FuseSvgIcon>
											</button>
										</div>
									)}
									muiTablePaperProps={{
										elevation: 0,
										square: true,
										className:
											'flex flex-col flex-auto overflow-hidden rounded-none border-0 shadow-none'
									}}
									muiTableContainerProps={{
										className: 'flex-auto overflow-x-auto'
									}}
									muiTableHeadCellProps={{
										sx: {
											backgroundColor: '#f8fafc',
											borderBottom: '1px solid #eaecf0',
											color: '#344054',
											fontFamily: 'Geist, sans-serif',
											fontSize: 11,
											fontWeight: 700,
											letterSpacing: '0.04em',
											py: 1.8
										}
									}}
									muiTableBodyCellProps={{
										sx: {
											borderBottom: '1px solid #f2f4f7',
											color: '#101828',
											fontFamily: 'Geist, sans-serif',
											fontSize: 12,
											py: 2.4,
											verticalAlign: 'top'
										}
									}}
									muiTableBodyRowProps={{
										sx: {
											backgroundColor: '#ffffff'
										}
									}}
									initialState={{
										density: 'compact',
										columnPinning: {
											right: ['mrt-row-actions']
										}
									}}
								/>
							</div>
						</Paper>
						</div>
					)
				}
			/>

			<Dialog
				open={false}
				onClose={() => setSelectedSite(null)}
				maxWidth={false}
				slotProps={{
					paper: {
						className:
							'm-0 h-screen max-h-screen w-screen max-w-none overflow-hidden rounded-none bg-[#f8fafc] shadow-none'
					}
				}}
			>
				<div className="flex h-full bg-[#f8fafc] font-['Geist'] text-[#101828]">
					<aside className="flex h-full w-[211px] shrink-0 flex-col border-r border-[#e4e7ec] bg-white">
						<div className="flex h-[66px] items-center gap-2 px-[14px]">
							<div className="flex h-[25px] w-[25px] items-center justify-center rounded-[4px] bg-[#155dfc]">
								<span className="h-[11px] w-[11px] rounded-sm bg-white" />
							</div>
							<div>
								<Typography className="font-['Geist'] text-[14px] leading-4 font-bold text-[#101828]">
									FUSE
								</Typography>
								<Typography className="font-['Geist'] text-[10px] leading-3 text-[#667085]">
									React
								</Typography>
							</div>
						</div>

						<nav className="flex-1 overflow-hidden px-[14px] pt-[10px]">
							<div className="mb-[24px] flex items-center gap-3 text-[13px] text-[#4a5565]">
								<FuseSvgIcon size={16}>lucide:briefcase-business</FuseSvgIcon>
								<span>Sales Team</span>
							</div>

							<Typography className="font-['Geist'] text-[10px] leading-4 font-bold text-[#155dfc]">
								Payouts &amp; Setup
							</Typography>
							<Typography className="mb-[14px] mt-[4px] font-['Geist'] text-[11px] leading-4 text-[#667085]">
								Custom made application designs
							</Typography>
							{[
								{ label: 'Agent Payouts', icon: 'lucide:dollar-sign' },
								{ label: 'Affiliate Payouts', icon: 'lucide:dollar-sign' },
								{ label: 'Sales Hierarchy Setup', icon: 'lucide:settings' }
							].map((item) => (
								<div
									key={item.label}
									className="mb-[14px] flex items-center gap-3 text-[13px] text-[#4a5565]"
								>
									<FuseSvgIcon size={16}>{item.icon}</FuseSvgIcon>
									<span>{item.label}</span>
								</div>
							))}

							<Typography className="mt-[22px] font-['Geist'] text-[10px] leading-4 font-bold text-[#155dfc]">
								Others
							</Typography>
							<Typography className="mb-[14px] mt-[4px] font-['Geist'] text-[11px] leading-4 text-[#667085]">
								Custom made application designs
							</Typography>
							{[
								{ label: 'API Management', icon: 'lucide:key-round' },
								{ label: 'Registration Config', icon: 'lucide:user-plus' },
								{ label: 'Admin Users', icon: 'lucide:users-round' },
								{ label: 'Activity Logs', icon: 'lucide:activity' },
								{ label: '2FA Setup', icon: 'lucide:shield-check' }
							].map((item) => (
								<div
									key={item.label}
									className="mb-[14px] flex items-center gap-3 text-[13px] text-[#4a5565]"
								>
									<FuseSvgIcon size={16}>{item.icon}</FuseSvgIcon>
									<span>{item.label}</span>
								</div>
							))}
							<div className="mb-[18px] flex h-[31px] items-center gap-3 rounded-[7px] bg-[#f1f2f5] px-[8px] text-[13px] font-medium text-[#101828]">
								<FuseSvgIcon size={16}>lucide:layers</FuseSvgIcon>
								<span>Whitelabel</span>
							</div>

							<Typography className="font-['Geist'] text-[10px] leading-4 font-bold text-[#155dfc]">
								KYC
							</Typography>
							<Typography className="mb-[14px] mt-[4px] font-['Geist'] text-[11px] leading-4 text-[#667085]">
								Know Your Customer verification
							</Typography>
							<div className="flex items-center gap-3 text-[13px] text-[#4a5565]">
								<FuseSvgIcon size={16}>lucide:badge-check</FuseSvgIcon>
								<span>KYC Verification</span>
							</div>
						</nav>

						<div className="border-t border-[#e4e7ec] p-[14px]">
							<div className="mb-[14px] rounded-[7px] bg-[#f8fafc] px-[12px] py-[11px]">
								<Typography className="font-['Geist'] text-[11px] leading-4 font-semibold text-[#101828]">
									Need assistance to get started?
								</Typography>
								<Typography className="mt-[5px] font-['Geist'] text-[11px] leading-4 font-semibold text-[#155dfc]">
									View documentation ›
								</Typography>
							</div>
							<div className="flex items-center gap-[9px]">
								<div className="h-[31px] w-[31px] rounded-full bg-gradient-to-br from-[#4d8cff] to-[#9d55ff]" />
								<div className="min-w-0 flex-1">
									<Typography className="truncate font-['Geist'] text-[12px] leading-4 font-medium text-[#101828]">
										Abbott Keitch
									</Typography>
									<Typography className="truncate font-['Geist'] text-[10px] leading-3 text-[#667085]">
										abbott@fusetheme.com
									</Typography>
								</div>
								<span className="h-[5px] w-[5px] rounded-full bg-[#00c950]" />
							</div>
						</div>
					</aside>

					<div className="flex min-w-0 flex-1 flex-col">
						<header className="flex h-[49px] shrink-0 items-center justify-between border-b border-[#e4e7ec] bg-white px-[18px]">
							<div className="flex items-center gap-[13px] text-[#667085]">
								<FuseSvgIcon size={17}>lucide:menu</FuseSvgIcon>
								<FuseSvgIcon size={17}>lucide:clipboard</FuseSvgIcon>
								<FuseSvgIcon size={17}>lucide:star</FuseSvgIcon>
								<FuseSvgIcon size={17}>lucide:send</FuseSvgIcon>
							</div>
							<div className="flex items-center gap-[14px]">
								<button className="flex h-[24px] items-center gap-[4px] rounded-[4px] border border-[#e4e7ec] bg-white px-[7px] text-[12px] text-[#344054]">
									<span className="text-[13px]">🇺🇸</span>
									<span>EN</span>
								</button>
								{['lucide:expand', 'lucide:search', 'lucide:sun', 'lucide:bell', 'lucide:settings'].map((icon) => (
									<FuseSvgIcon
										key={icon}
										size={17}
										className="text-[#667085]"
									>
										{icon}
									</FuseSvgIcon>
								))}
								<Button
									startIcon={<FuseSvgIcon size={14}>lucide:clipboard</FuseSvgIcon>}
									className="h-[32px] rounded-[7px] bg-[#155dfc] px-[12px] font-['Geist'] text-[13px] font-medium text-white shadow-none hover:bg-[#155dfc]"
								>
									Messages
								</Button>
								<Button
									startIcon={<FuseSvgIcon size={14}>lucide:settings</FuseSvgIcon>}
									className="h-[32px] rounded-[7px] bg-[#155dfc] px-[12px] font-['Geist'] text-[13px] font-medium text-white shadow-none hover:bg-[#155dfc]"
								>
									Settings
								</Button>
								<div className="h-[32px] w-[32px] rounded-full bg-gradient-to-br from-[#4d8cff] to-[#9d55ff]" />
							</div>
						</header>

						<main className="min-h-0 flex-1 overflow-y-auto bg-[#f8fafc]">
							<div className="w-full px-[24px] py-[25px] pb-8">
						<button
							type="button"
							onClick={() => setSelectedSite(null)}
							className="inline-flex h-[26px] items-center gap-2 rounded-md border border-[#eaecf0] bg-white px-3 text-[12px] font-semibold text-[#101828] shadow-sm"
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
									<div className="flex flex-wrap items-center gap-2">
										<Typography className="font-['Geist'] text-[21px] leading-7 font-bold text-[#101828]">
											{selectedSite?.name}
										</Typography>
									</div>
									<div className="mt-1 flex flex-wrap items-center gap-2">
										<span className="rounded-[4px] border border-[#e4e7ec] bg-white px-2 py-1 font-mono text-[11px] leading-none text-[#101828]">
											{selectedSite?.appId}
										</span>
										<span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-medium leading-none text-[#008236]">
											{selectedSite?.status}
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
							{[
								{
									id: 'players',
									label: 'Total Players',
									value: selectedSite?.totalPlayers,
									hint: `+${selectedSite?.activePlayers} active`,
									icon: 'lucide:users-round',
									iconClass: 'text-[#155dfc]',
									valueClass: 'text-[#101828]'
								},
								{
									id: 'bets',
									label: "Today's Bets",
									value: selectedSite?.bets,
									hint: '',
									icon: 'lucide:trending-up',
									iconClass: 'text-[#9810fa]',
									valueClass: 'text-[#101828]'
								},
								{
									id: 'deposits',
									label: "Today's Deposits",
									value: selectedSite?.deposits,
									hint: '',
									icon: 'lucide:dollar-sign',
									iconClass: 'text-[#00a63e]',
									valueClass: 'text-[#101828]'
								},
								{
									id: 'revenue',
									label: "Today's Revenue",
									value: selectedSite?.revenue,
									hint: '',
									icon: 'lucide:chart-column',
									iconClass: 'text-[#155dfc]',
									valueClass: 'text-[#155dfc]'
								}
							].map((card) => (
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

						<div className="mt-5 grid grid-cols-[2fr_1fr] gap-5">
							<div className="rounded-[10px] border border-[#e4e7ec] bg-white p-[19px]">
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
								<div className="mt-6 grid grid-cols-2 gap-x-16 gap-y-4">
									{[
										{ label: 'SPOC', value: selectedSite?.spoc },
										{ label: 'Production Domain', value: selectedSite?.domain, icon: 'lucide:link', color: 'text-[#155dfc]' },
										{ label: 'Support Group', value: selectedSite?.support },
										{
											label: 'Test Domain',
											value: selectedSite?.productionDomain || `staging.${selectedSite?.domain}`,
											icon: 'lucide:link',
											color: 'text-[#f54900]'
										},
										{ label: 'Created On', value: selectedSite?.created },
										{ label: 'Last Activity', value: `${selectedSite?.lastDate} ${selectedSite?.lastTime}` }
									].map((item) => (
										<div key={item.label}>
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

							<div className="rounded-[10px] border border-[#e4e7ec] bg-white p-[19px]">
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
									{selectedSite?.products?.map((product) => (
										<div
											key={product}
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
						</div>

						<div className="mt-5 grid grid-cols-2 gap-5">
							<div className="rounded-[10px] border border-[#e4e7ec] bg-white p-[19px]">
								<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
									Financial Overview
								</Typography>
								<Typography className="mt-1 font-['Geist'] text-[14px] leading-5 text-[#667085]">
									Today's financial activity
								</Typography>
								<div className="mt-[19px] space-y-3">
									{[
										{
											label: 'Deposits',
											value: selectedSite?.deposits,
											box: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#008236]',
											icon: 'lucide:dollar-sign'
										},
										{
											label: 'Withdrawals',
											value: selectedSite?.withdrawals,
											box: 'border-[#fecaca] bg-[#fef2f2] text-[#c10007]',
											icon: 'lucide:dollar-sign'
										},
										{
											label: 'Net Revenue',
											value: selectedSite?.revenue,
											box: 'border-[#bfdbfe] bg-[#eff6ff] text-[#155dfc]',
											icon: 'lucide:chart-column'
										}
									].map((item) => (
										<div
											key={item.label}
											className={`flex h-[67px] items-center justify-between rounded-[8px] border px-[14px] ${item.box}`}
										>
											<div>
												<Typography className="font-['Geist'] text-[12px] leading-4 font-medium">
													{item.label}
												</Typography>
												<Typography className="mt-1 font-['Geist'] text-[21px] leading-6 font-bold">
													{item.value}
												</Typography>
											</div>
											<FuseSvgIcon size={25}>{item.icon}</FuseSvgIcon>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-[10px] border border-[#e4e7ec] bg-white p-[19px]">
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
											{selectedSite?.activePlayers} / {selectedSite?.totalPlayers}
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
									<div className="h-[70px] rounded-[8px] border border-[#e9d5ff] bg-[#faf5ff] px-[14px] py-[12px]">
										<Typography className="font-['Geist'] text-[12px] leading-4 text-[#8200db]">
											Total Bets
										</Typography>
										<Typography className="mt-1 font-['Geist'] text-[22px] leading-7 font-bold text-[#6e11b0]">
											{selectedSite?.bets}
										</Typography>
									</div>
									<div className="h-[70px] rounded-[8px] border border-[#bfdbfe] bg-[#eff6ff] px-[14px] py-[12px]">
										<Typography className="font-['Geist'] text-[12px] leading-4 text-[#155dfc]">
											Avg/Player
										</Typography>
										<Typography className="mt-1 font-['Geist'] text-[22px] leading-7 font-bold text-[#1c398e]">
											2.6
										</Typography>
									</div>
								</div>
							</div>
						</div>

							</div>
						</main>
					</div>
				</div>
			</Dialog>
			{/* Create Whitelabel Side-Drawer */}
			<Dialog
				open={isCreateOpen}
				onClose={handleCloseCreate}
				maxWidth={false}
				slotProps={{
					paper: {
						className:
							'm-0 ml-auto h-full max-h-none w-full max-w-[560px] overflow-hidden rounded-l-[28px] rounded-r-none bg-white shadow-2xl'
					}
				}}
			>
				<div className="flex h-full flex-col bg-white font-['Geist']">
					{/* Header */}
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
								onClick={handleCloseCreate}
								className="text-[#98a2b3] hover:text-[#344054]"
								size="small"
								aria-label="Close create popup"
							>
								<FuseSvgIcon size={18}>lucide:x</FuseSvgIcon>
							</IconButton>
						</div>

						{/* Tab Bar */}
						<div className="mt-5 flex h-10 rounded-xl bg-[#f1f2f5] p-1">
							<button
								type="button"
								className={`flex-1 rounded-lg text-[13px] font-semibold transition-all ${activeTab === 0
										? 'bg-white text-[#101828] shadow-sm'
										: 'text-[#667085] hover:text-[#344054]'
									}`}
								onClick={() => setActiveTab(0)}
							>
								Basic Information
							</button>
							<button
								type="button"
								className={`flex-1 rounded-lg text-[13px] font-semibold transition-all ${activeTab === 1
										? 'bg-white text-[#101828] shadow-sm'
										: 'text-[#667085] hover:text-[#344054]'
									}`}
								onClick={() => setActiveTab(1)}
							>
								Products &amp; Features
							</button>
						</div>
					</div>

					{/* Tab Content */}
					<div className="flex-1 overflow-y-auto px-6 py-6">
						{activeTab === 0 && (
							<div className="space-y-5">
								{/* Whitelabel Name */}
								<div>
									<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
										Whitelabel Name <span className="text-[#f04438]">*</span>
									</label>
									<input
										type="text"
										placeholder="e.g., BetMaster Pro"
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
										className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
									/>
								</div>

								{/* SPOC + Support Group */}
								<div className="grid grid-cols-2 gap-5">
									<div>
										<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
											SPOC (Single Point of Contact) <span className="text-[#f04438]">*</span>
										</label>
										<input
											type="text"
											placeholder="e.g., John Doe"
											value={formData.spoc}
											onChange={(e) => setFormData({ ...formData, spoc: e.target.value })}
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
											onChange={(e) => setFormData({ ...formData, supportGroup: e.target.value })}
											className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
										/>
									</div>
								</div>

								{/* Production Domain + Test Domain */}
								<div className="grid grid-cols-2 gap-5">
									<div>
										<label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
											Production Domain <span className="text-[#f04438]">*</span>
										</label>
										<input
											type="text"
											placeholder="e.g., example.com"
											value={formData.productionDomain}
											onChange={(e) => setFormData({ ...formData, productionDomain: e.target.value })}
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
											onChange={(e) => setFormData({ ...formData, testDomain: e.target.value })}
											className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]"
										/>
									</div>
								</div>

								{/* Auto-Generated APP ID Notice */}
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

								{/* Product Cards Grid */}
								<div className="mt-5 grid grid-cols-2 gap-3">
									{productOptions.map((product) => {
										const isSelected = selectedProducts.includes(product.id);
										return (
											<button
												key={product.id}
												type="button"
												onClick={() => handleToggleProduct(product.id)}
												className={`relative flex h-[64px] items-center gap-3 rounded-xl border px-4 text-left transition-all ${isSelected
														? 'border-[#155dfc] bg-[#eff6ff]'
														: 'border-[#e4e7ec] bg-white hover:border-[#d0d5dd] hover:bg-[#f9fafb]'
													}`}
											>
												<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8fafc] text-[18px] leading-none">
													{product.icon}
												</span>
												<span className="text-[14px] font-semibold text-[#101828]">
													{product.name}
												</span>
												{isSelected && (
													<span className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[#155dfc]">
														<FuseSvgIcon size={18}>lucide:circle-check</FuseSvgIcon>
													</span>
												)}
											</button>
										);
									})}
								</div>

								{/* Selected Products Badges */}
								{selectedProducts.length > 0 && (
									<div className="mt-5 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-4">
										<Typography className="font-['Geist'] text-[13px] font-semibold leading-5 text-[#101828]">
											Selected Products
										</Typography>
										<div className="mt-2 flex flex-wrap gap-2">
											{selectedProducts.map((productId) => {
												const product = productOptions.find((p) => p.id === productId);
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

					{/* Footer */}
					<div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
						<Button
							variant="outlined"
							onClick={handleCloseCreate}
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
		</>
	);
}

export default WhitelabelManagementView;
