import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Tabs, Tab } from '@mui/material';
import GithubIssuesDataType from '../../../../../api/types/home/GithubIssuesDataType';
import { useGetWidget } from '../../../../../api/hooks/widgets/useGetWidget';

const primaryCards = [
	{ key: 'new-issues', label: 'New Issues', subtitle: 'After bonus & fees' },
	{ key: 'closed-issues', label: 'Closed', subtitle: 'After bonus & fees' },
	{ key: 'in-progress', label: 'In Progress', subtitle: 'After bonus & fees' },
	{ key: 'fixed', label: 'Fixed', subtitle: 'After bonus & fees' }
] as const;

const secondaryCards = [
	{ key: 'wont-fix', label: "Won't Fix" },
	{ key: 're-opened', label: 'Re-opened' },
	{ key: 'needs-triage', label: 'Needs Triage' },
	{ key: 'review-pending', label: 'Review Pending' },
	{ key: 'escalated', label: 'Escalated' },
	{ key: 'blocked', label: 'Blocked' },
	{ key: 'resolved', label: 'Resolved' },
	{ key: 'duplicate', label: 'Duplicate' }
] as const;

function formatValue(val: number): string {
	if (val >= 100000) return `â‚¹${(val / 100000).toFixed(1)} L`;
	if (val >= 1000) return `â‚¹${val.toLocaleString('en-IN')}`;
	return String(val);
}

type PrimaryCardProps = {
	title: string;
	value: number;
	subtitle: string;
	isPositive?: boolean;
};

function PrimaryCard({ title, value, subtitle, isPositive }: PrimaryCardProps) {
	return (
		<div className="flex flex-col items-center justify-center rounded-2xl bg-gray-100 border border-gray-200 shadow-sm px-4 py-6 text-center min-h-[140px] font-[geist]">
			<span className="text-5xl font-bold text-blue-600 leading-tight mb-1">
				{formatValue(value)}
			</span>
			<span className="text-base font-semibold text-blue-500 mb-2">
				{title}
			</span>
			<span className={`text-xs ${isPositive ? 'text-green-500' : 'text-gray-400'}`}>
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
		<div className="flex flex-col items-center justify-center rounded-xl bg-gray-100 border border-gray-200 px-15 py-15 text-center h-[110px] gap-2 font-[geist]">
			<span className="text-3xl font-bold text-gray-800 leading-tight">
				{formatValue(value)}
			</span>
			<span className="text-sm text-gray-500">
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
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">

			<div className="flex flex-col items-start justify-between sm:flex-row">
				<Typography className="text-xl font-semibold tracking-tight">
					Finance
				</Typography>
				<div className="mt-2 sm:mt-0 px-4 py-1.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-600">
					Live Balance: {currentOverview?.balance?.toLocaleString('en-IN') ?? 'â€”'}
				</div>
			</div>

			<div className="mt-3">
				<Tabs
					value={tabValue}
					onChange={(_ev, value: number) => setTabValue(value)}
				>
					{Object.entries(ranges).map(([key, label], index) => (
						<Tab key={key} value={index} label={label} />
					))}
				</Tabs>
			</div>

			<Typography className="mt-4 text-sm font-medium text-gray-500">
				Overview
			</Typography>

			<div className="mt-4 space-y-3">
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

				<div className="grid grid-cols-4 gap-6 w-full sm:grid-cols-4 lg:grid-cols-8">
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
