import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { MouseEvent, useMemo, useState } from 'react';
import { ReportFilters } from '../../hooks/useReportData';

type ReportsHeaderProps = {
	filters?: ReportFilters;
	onFilterChange?: (key: keyof ReportFilters, value: string) => void;
	onResetFilters?: () => void;
	onSearch?: () => void;
	title?: string;
};

function ReportsHeader({ filters, onFilterChange, onResetFilters, onSearch, title }: ReportsHeaderProps) {
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
	const [activeFilterKey, setActiveFilterKey] = useState<keyof ReportFilters | null>(null);

	const filterOptions = useMemo<Record<keyof ReportFilters, { label: string; placeholder: string; options: string[] }>>(
		() => ({
			agent: {
				label: 'Agent',
				placeholder: 'Select',
				options: ['Alpha Agent', 'Bravo Agent']
			},
			actionCategory: {
				label: 'Action Category',
				placeholder: 'Select',
				options: ['Deposit', 'Withdrawal', 'Bonus']
			},
			date: {
				label: 'Date',
				placeholder: 'Today Till Last 15minute',
				options: ['Today Till Last 15minute', 'Today', 'Last 7 Days', 'This Month']
			},
			provider: {
				label: 'Provider',
				placeholder: 'Select',
				options: ['Evolution', 'Pragmatic Play', 'SA Gaming']
			}
		}),
		[]
	);

	function handleMenuOpen(key: keyof ReportFilters) {
		return (event: MouseEvent<HTMLButtonElement>) => {
			setActiveFilterKey(key);
			setMenuAnchor(event.currentTarget);
		};
	}

	function handleMenuClose() {
		setMenuAnchor(null);
		setActiveFilterKey(null);
	}

	function handleSelectOption(value: string) {
		if (activeFilterKey) {
			onFilterChange?.(activeFilterKey, value);
		}

		handleMenuClose();
	}

	function getDisplayValue(key: keyof ReportFilters) {
		const value = filters?.[key];
		return value || filterOptions[key].placeholder;
	}

	return (
		<div className="container flex w-full">
			<div className="flex w-full flex-col gap-3 px-4 pt-4 pb-0 md:px-8">
				{title && (
					<div className="flex min-w-0 flex-auto flex-col">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.08 } }}
						>
							<Typography className="text-3xl font-semibold tracking-tight">{title}</Typography>
						</motion.div>
					</div>
				)}
				{filters && (
					<div className="flex flex-col gap-3">
						<div className="grid grid-cols-6 justify-evenly md:grid-cols-6  xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] xl:items-end">
							{(Object.keys(filterOptions) as (keyof ReportFilters)[]).map((key) => (
								<div
									key={key}
									className="flex min-w-0 flex-col gap-1.5"
								>
									<Typography className="text-[14px] font-medium leading-none text-slate-900">
										{filterOptions[key].label}
									</Typography>
									<button
										type="button"
										onClick={handleMenuOpen(key)}
										className="flex h-10 w-35 items-center justify-between rounded-[8px] border border-slate-300 bg-white px-4 text-left text-[15px] text-slate-700 transition hover:border-slate-400"
									>
										<span className="truncate">{getDisplayValue(key)}</span>
										<FuseSvgIcon
											size={16}
											className="shrink-0 text-slate-500"
										>
											lucide:chevron-down
										</FuseSvgIcon>
									</button>
								</div>
							))}
							<div className="flex items-end xl:justify-end">
								<Button
									variant="outlined"
									color="inherit"
									onClick={onResetFilters}
									startIcon={<FuseSvgIcon size={15}>lucide:rotate-ccw</FuseSvgIcon>}
									sx={{
										borderColor: '#be123c',
										borderRadius: '12px',
										borderWidth: 1.5,
										color: '#be123c',
										fontWeight: 700,
										minHeight: 44,
										px: 2.75,
										textTransform: 'none'
									}}
								>
									Reset Filter
								</Button>
							</div>
							<div className="flex items-end xl:justify-end">
								<Button
									variant="contained"
									color="secondary"
									onClick={onSearch}
									startIcon={<FuseSvgIcon size={18}>lucide:search</FuseSvgIcon>}
									sx={{
										borderRadius: '12px',
										boxShadow: 'none',
										fontWeight: 700,
										minHeight: 44,
										px: 3,
										textTransform: 'none'
									}}
								>
									Search
								</Button>
							</div>
						</div>
						<div className="flex">
							<Button
								variant="outlined"
								color="inherit"
								endIcon={<FuseSvgIcon size={16}>lucide:sliders-horizontal</FuseSvgIcon>}
								sx={{
									borderColor: '#cbd5e1',
									borderRadius: '8px',
									color: '#334155',
									fontWeight: 600,
									minHeight: 40,
									px: 1.75,
								}}
							>
									More Filters
							</Button>
						</div>
						<Menu
							anchorEl={menuAnchor}
							open={Boolean(menuAnchor)}
							onClose={handleMenuClose}
							slotProps={{
								paper: {
									className: 'mt-1 rounded-xl border border-slate-200 shadow-lg'
								}
							}}
						>
							{activeFilterKey && (
								<>
									<MenuItem onClick={() => handleSelectOption('')}>
										{filterOptions[activeFilterKey].placeholder}
									</MenuItem>
									{filterOptions[activeFilterKey].options.map((option) => (
										<MenuItem
											key={option}
											onClick={() => handleSelectOption(option)}
										>
											{option}
										</MenuItem>
									))}
								</>
							)}
						</Menu>
					</div>
				)}
			</div>
		</div>
	);
}

export default ReportsHeader;
