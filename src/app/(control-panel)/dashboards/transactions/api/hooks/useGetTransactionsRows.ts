import { useQuery } from '@tanstack/react-query';
import { transactionsApiService } from '../services/transactionsApiService';
import { TransactionsRowType } from '../types';

export const transactionsRowsQueryKey = ['transactionsDashboard', 'rows'];

export const useGetTransactionsRows = () => {
	return useQuery<TransactionsRowType[]>({
		queryFn: transactionsApiService.getRows,
		queryKey: transactionsRowsQueryKey
	});
};
