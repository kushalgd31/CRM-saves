import Typography from '@mui/material/Typography';
import PageBreadcrumb from 'src/components/PageBreadcrumb';

/**
 * The DepositDashboardAppHeader component.
 */
function DepositDashboardAppHeader() {
	return (
		<div className="container flex w-full">
			<div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
				<PageBreadcrumb className="mb-2" />
				<div className="flex min-w-0 flex-auto flex-col">
					<Typography className="text-3xl font-semibold tracking-tight">Deposit</Typography>
				</div>
			</div>
		</div>
	);
}

export default DepositDashboardAppHeader;
