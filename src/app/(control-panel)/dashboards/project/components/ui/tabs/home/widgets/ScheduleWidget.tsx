import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Tabs, Tab } from '@mui/material';
import ScheduleDataType from '../../../../../api/types/home/ScheduleDataType';
import { useGetWidget } from '../../../../../api/hooks/widgets/useGetWidget';

/**
 * The ScheduleWidget widget.
 */
function ScheduleWidget() {
	const { data: widget, isLoading } = useGetWidget<ScheduleDataType>('schedule');

	const ranges = widget?.ranges || {};
	const [tabValue, setTabValue] = useState(0);
	const currentRange = Object.keys(ranges)[tabValue];
	const currentSchedule = widget?.series?.[currentRange] || [];

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}

	return (
		<Paper className="flex h-full flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<div className="flex flex-col items-start justify-between sm:flex-row">
				<Typography className="truncate text-lg leading-6 font-medium tracking-tight">Top 5 by GGR today</Typography>
				<div className="mt-3 sm:mt-0">
					<Tabs
						value={tabValue}
						onChange={(ev, value: number) => setTabValue(value)}
					>
						{Object.entries(ranges).map(([key, label], index) => (
							<Tab
								key={key}
								value={index}
								label={label}
							/>
						))}
					</Tabs>
				</div>
			</div>
			<table className='mt-5  border-collapse text-left'>
				<thead>
					<tr className='border-b text-sm uppercase tracking-wide text-slate-500'>
						<th className='pb-3 pr-2 font-medium'>#</th>
						<th className='pb-3 pr-2 font-medium'>Game</th>
						<th className='pb-3 pr-2 font-medium'>Type</th>
						<th className='pb-3 font-medium'>GGR</th>
					</tr>
				</thead>
				<tbody>
					{currentSchedule.map((item, index) => (
						<tr key={`${item.title}-${index}`} className='border-b last:border-b-0 text-sm'>
							<td className='py-3 pr-4 text-slate-700'>{index + 1}</td>
							<td className='py-3 pr-2 text-slate-900'>{item.title}</td>
							<td className='py-3 pr-2 text-slate-700'>{item.type}</td>
							<td className='py-3 text-slate-700'>{item.GGR || '—'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Paper>
	);
}

export default memo(ScheduleWidget);