import Typography from '@mui/material/Typography';

function PlayerCommissionDashboardAppHeader() {
	return (
		<div className="container flex w-full">
			<div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
				<div className="flex min-w-0 flex-auto flex-col">
					<Typography className="text-3xl font-semibold tracking-tight">Player Commission</Typography>
				</div>
			</div>
		</div>
	);
}

export default PlayerCommissionDashboardAppHeader;
