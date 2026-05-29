import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import WidgetDataType from '../../../../dashboards/project/api/types/home/WidgetDataType';
import { useGetWidget } from '../../../../dashboards/project/api/hooks/widgets/useGetWidget';

type OverdueWidgetProps = {
	title: string;
	data: DataType;
	variant?: 'default' | 'compact';
};

type DataType = {
	count: number | string;
	name: string;
	color?: string;
};

/**
 * The OverdueWidget widget.
 */
function CompactHeirCard(props: OverdueWidgetProps) {
	const toneClass =
		props.data.color === 'success'
			? 'text-[#00a63e]'
			: props.data.color === 'primary'
				? 'text-[#155dfc]'
				: props.data.color === 'secondary'
					? 'text-[#9810fa]'
					: props.data.color === 'warning'
						? 'text-[#ff4f0f]'
						: 'text-[#101828]';

	return (
		<Paper
			className="flex h-[95px] w-full flex-col justify-center rounded-xl border border-[#eaecf0] bg-white px-5 shadow-none"
			elevation={0}
		>
			<Typography className={`font-['Geist'] text-[22px] leading-6 font-semibold ${toneClass}`}>
				{String(props.data.count)}
			</Typography>
			<Typography className="mt-1 font-[Geist] text-[13px] leading-4 text-[#4A5565]">
				{props.data.name}
			</Typography>
		</Paper>
	);
}

function DefaultHeirCard(props: OverdueWidgetProps) {
	const { data: widget, isLoading } = useGetWidget<WidgetDataType>('overdue');

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}

	const { data, title } = widget;

	return (
		<Paper className="flex h-30 w-60 flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
			<div className="flex items-center justify-between px-2 pt-2">
				<Typography
					className="text-md truncate px-3 leading-6 font-medium tracking-tight"
					color="text.secondary"
				>
					{props.title || title}
				</Typography>
				<IconButton aria-label="more">
					<FuseSvgIcon
						className={
							props.data.color === 'success'
								? 'text-green-600'
								: props.data.color === 'primary'
									? 'text-blue-600'
									: props.data.color === 'secondary'
										? 'text-purple-600'
										: props.data.color === 'warning'
											? 'text-amber-600'
											: 'text-slate-600'
						}
					>
						lucide:settings
					</FuseSvgIcon>
				</IconButton>
			</div>
			<div className="mt-2 text-center">
				<Typography className="text-5xl leading-none font-bold tracking-tight sm:text-6xl">
					{String(props.data.count)}
				</Typography>
				<Typography
					className="text-lg font-medium"
					color="text.secondary"
				>
					{props.data.name || data.name}
				</Typography>
			</div>
			<Typography
				className="mt-5 mb-6 flex w-full items-baseline justify-center gap-2"
				color="text.secondary"
			>
				{/* <span className="truncate">{data.extra.name}:</span> */}
				{/* <b>{String(data.extra.count)}</b> */}
			</Typography>
		</Paper>
	);
}

function OverdueWidget(props: OverdueWidgetProps) {
	if (props.variant === 'compact') {
		return <CompactHeirCard {...props} />;
	}

	return <DefaultHeirCard {...props} />;
}

export default memo(OverdueWidget);
