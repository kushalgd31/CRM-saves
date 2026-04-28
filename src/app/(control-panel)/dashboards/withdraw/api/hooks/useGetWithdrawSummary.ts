import { useQuery } from '@tanstack/react-query';
import { withdrawApiService } from '../services/withdrawApiService';
import { WithdrawSummaryCardType } from '../types';

export const withdrawSummaryQueryKey = ['withdrawDashboard', 'summary'];

export const useGetWithdrawSummary = () => {
	return useQuery<WithdrawSummaryCardType[]>({
		queryFn: withdrawApiService.getSummary,
		queryKey: withdrawSummaryQueryKey
	});
};
