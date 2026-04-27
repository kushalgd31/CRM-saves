import Typography from '@mui/material/Typography';
import PageBreadcrumb from 'src/components/PageBreadcrumb';

function WithdrawDashboardAppHeader() {
	return (
		<div className="container flex w-full">
			<div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
				<PageBreadcrumb className="mb-2" />
				<div className="flex min-w-0 flex-auto flex-col">
					<Typography className="text-3xl font-semibold tracking-tight">Withdraw</Typography>
					<Typography className="mt-1 text-[14px] text-slate-500">
						Withdrawal dashboard is ready for the next API-backed screen.
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default WithdrawDashboardAppHeader;
