'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import WithdrawDashboardAppHeader from '../ui/WithdrawDashboardAppHeader';
import WithdrawTable from '../ui/WithdrawTable';

function WithdrawDashboardAppView() {
	return (
		<FusePageSimple
			header={<WithdrawDashboardAppHeader />}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-8">
					<WithdrawTable />
				</div>
			}
		/>
	);
}

export default WithdrawDashboardAppView;
