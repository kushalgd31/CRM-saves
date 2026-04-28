'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import TransactionsDashboardAppHeader from '../ui/TransactionsDashboardAppHeader';
import TransactionsTable from '../ui/TransactionsTable';

function TransactionsDashboardAppView() {
	return (
		<FusePageSimple
			header={<TransactionsDashboardAppHeader />}
			content={
				<div className="w-full px-4 pt-4 pb-6 md:px-8">
                    <TransactionsTable />
				</div>
			}
		/>
	);
}

export default TransactionsDashboardAppView;
