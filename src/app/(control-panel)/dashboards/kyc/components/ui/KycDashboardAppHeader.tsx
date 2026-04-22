import Typography from '@mui/material/Typography';

function KycDashboardAppHeader() {
	return (
		<div className="container flex w-full">
			<div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
				<div className="flex min-w-0 flex-auto flex-col">
					<Typography className="text-3xl font-semibold tracking-tight">KYC Verification</Typography>
					<Typography className="mt-1 text-[14px] text-slate-500">
						Review and verify user documents for KYC compliance
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default KycDashboardAppHeader;
