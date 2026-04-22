import { useQuery } from '@tanstack/react-query';
import { withdrawApiService } from '../services/withdrawApiService';
import { WithdrawRowType } from '../types';

export const withdrawRowsQueryKey = ['withdrawDashboard', 'rows'];

export const useGetWithdrawRows = () => {
	return useQuery<WithdrawRowType[]>({
		queryFn: withdrawApiService.getRows,
		queryKey: withdrawRowsQueryKey
	});
};
