import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
// import { Tabs, Tab } from '@mui/material';
import GithubIssuesDataType from '../../../../../api/types/home/GithubIssuesDataType';
import { useGetWidget } from '../../../../../api/hooks/widgets/useGetWidget';

const primaryCards = [
	{ key: 'new-issues', label: 'GGR', subtitle: 'After bonus & fees' },
	{ key: 'closed-issues', label: 'NGR', subtitle: 'After bonus & fees' },
	{ key: 'in-progress', label: 'Bonus', subtitle: 'After bonus & fees' },
	{ key: 'fixed', label: 'Comissions', subtitle: 'After bonus & fees' }
] as const;

const secondaryCards = [
	{ key: 'wont-fix', label: "Bets" },
	{ key: 're-opened', label: 'Wins' },
	{ key: 'needs-triage', label: 'Bonus' },
	{ key: 'review-pending', label: 'Fees' },
	{ key: 'escalated', label: 'Deposit' },
	{ key: 'blocked', label: 'Loosing' },
	{ key: 'resolved', label: 'Agent' },
	{ key: 'duplicate', label: 'Affiliate' }
] as const;

function formatValue(val: number): string {
	if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
	if (val >= 1000) return `₹${val.toLocaleString('en-IN')}`;
	return `₹${val}`;
}

type PrimaryCardProps = {
	title: string;
	value: number;
	subtitle: string;
	isPositive?: boolean;
};

function PrimaryCard({ title, value, subtitle, isPositive }: PrimaryCardProps) {
	return (
		<div className="flex flex-col items-center justify-center rounded-lg bg-[#F6F7F8] py-4 px-4 text-center min-h-[120px] font-[geist] border border-slate-200">
			<span className="text-[22px] font-semibold text-[#1565C0] leading-tight md:text-[30px]">
				{formatValue(value)}
			</span>
			<span className="text-sm font-semibold text-[#1565C0] mb-3">
				{title}
			</span>
			<span className={`font-[geist] font-semibold text-xs ${isPositive ? 'text-green-500' : 'text-[#4B5563]'}`}>
				{subtitle}
			</span>
		</div>
	);
}

type SecondaryCardProps = {
	title: string;
	value: number;
};

function SecondaryCard({ title, value }: SecondaryCardProps) {
	return (
		<div className="flex min-h-[90px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-[#F6F7F8] px-4 py-4 text-center gap-2 font-[geist]">
			<span className="text-[18px] font-semibold text-[#4B5563] leading-tight md:text-2xl">
				{formatValue(value)}
			</span>
			<span className="text-sm font-semibold text-[#4B5563] mt-[-10%]">
				{title}
			</span>
		</div>
	);
}

function GithubIssuesWidget() {
	const [awaitRender, setAwaitRender] = useState(true);
	const [tabValue, setTabValue] = useState(0);

	const { data: widget, isLoading } = useGetWidget<GithubIssuesDataType>('githubIssues');

	useEffect(() => {
		setAwaitRender(false);
	}, []);

	if (isLoading) return <FuseLoading />;
	if (!widget || awaitRender) return null;

	const overview = widget.overview;
	const ranges = widget.ranges;
	const currentRange = Object.keys(ranges)[tabValue];
	const currentOverview = overview[currentRange];

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm pb-6">

			<div className="flex flex-col items-start justify-between px-6 pt-6 sm:flex-row">
				<Typography className="text-xl font-semibold font-geist tracking-tight">
					Finance
				</Typography>
				<div className="mt-2 sm:mt-0 px-4 py-1.5 rounded-lg border border-gray-200 bg-[#F6F7F8] text-sm text-[#4B5563] font-semibold font-[geist]">
					Live Balance: {currentOverview?.balance?.toLocaleString('en-IN') ?? '1,20,000'}
				</div>
			</div>

			{/* <div className="mt-3 px-6">
				<Tabs
					value={tabValue}
					onChange={(_ev, value: number) => setTabValue(value)}
				>
					{Object.entries(ranges).map(([key, label], index) => (
						<Tab key={key} value={index} label={label} />
					))}
				</Tabs>
			</div> */}

			<Typography className="mt-1 text-[12px] font-semibold font-[geist] text-[#4B5563] px-6">
				Overview
			</Typography>

			<div className="mt-4 space-y-3 p-2">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-4">
					{primaryCards.map((card, index) => (
						<PrimaryCard
							key={card.key}
							title={card.label}
							value={currentOverview[card.key]}
							subtitle={card.subtitle}
							isPositive={index === 0}
						/>
					))}
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 px-4">
					{secondaryCards.map((card) => (
						<SecondaryCard
							key={card.key}
							title={card.label}
							value={currentOverview[card.key]}
						/>
					))}
				</div>
			</div>
		</Paper>
	);
}

export default memo(GithubIssuesWidget);
