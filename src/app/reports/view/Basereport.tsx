'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import useParams from '@fuse/hooks/useParams';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import ReportsDataTable from '../components/ui/ReportsDataTable';
import ReportsHeader from '../components/ui/ReportsHeader';
import { defaultReportSlug, getReportConfig, reportNavigationItems, type ReportRow } from '../config/reportConfig';
import useReportData, { type ReportFilters } from '../hooks/useReportData';

const item = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0 }
};

const emptyFilters: ReportFilters = {
	agent: '',
	actionCategory: '',
	date: '',
	provider: ''
};

function Basereport() {
	const { reportKey } = useParams<{ reportKey?: string }>();
	const reportConfig = useMemo(() => getReportConfig(reportKey), [reportKey]);
	const [draftFilters, setDraftFilters] = useState<ReportFilters>(emptyFilters);
	const [appliedFilters, setAppliedFilters] = useState<ReportFilters>(emptyFilters);
	const { data, isLoading } = useReportData(reportConfig ?? getReportConfig(defaultReportSlug)!, appliedFilters);
	const [rows, setRows] = useState<ReportRow[]>(data);

	useEffect(() => {
		setRows(data);
	}, [data]);

	useEffect(() => {
		setDraftFilters(emptyFilters);
		setAppliedFilters(emptyFilters);
	}, [reportConfig?.slug]);

	if (!reportConfig) {
		return (
			<FusePageSimple
				header={<ReportsHeader title="Reports" />}
				content={
					<div className="w-full px-4 pt-4 pb-6 md:px-8">
						<Paper
							className="rounded-2xl border border-slate-200 p-6 shadow-sm"
							elevation={0}
						>
							<Typography className="text-xl font-semibold text-slate-900">Report not found</Typography>
							<Typography className="mt-2 text-sm text-slate-500">
								The requested report slug does not match any configured report page.
							</Typography>
							<div className="mt-5 flex flex-wrap gap-2">
								<Button
									component={RouterLink}
									to={`/reports/${defaultReportSlug}`}
									variant="contained"
									color="secondary"
								>
									Open Default Report
								</Button>
								{reportNavigationItems.map((item) => (
									<Button
										key={item.slug}
										component={RouterLink}
										to={item.path}
										variant="outlined"
										color="inherit"
									>
										{item.shortTitle}
									</Button>
								))}
							</div>
						</Paper>
					</div>
				}
			/>
		);
	}

	function handleDelete(ids: string[]) {
		setRows((currentRows) => currentRows.filter((row) => !ids.includes(String(row.id))));
	}

	function handleFilterChange(key: keyof ReportFilters, value: string) {
		setDraftFilters((currentFilters) => ({
			...currentFilters,
			[key]: value
		}));
	}

	function handleResetFilters() {
		setDraftFilters(emptyFilters);
		setAppliedFilters(emptyFilters);
	}

	function handleSearch() {
		setAppliedFilters(draftFilters);
	}

	return (
		<FusePageSimple
			header={<ReportsHeader title={reportConfig.title} />}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-8">
					<motion.div
						variants={item}
						initial="hidden"
						animate="show"
						className="space-y-4"
					>
						<ReportsDataTable
							data={rows}
							isLoading={isLoading}
							columns={reportConfig.columns}
							onDelete={handleDelete}
						/>
					</motion.div>
				</div>
			}
		/>
	);
}

export default Basereport;
