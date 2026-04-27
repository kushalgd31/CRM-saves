import { useQuery } from '@tanstack/react-query';
import { depositApiService } from '../services/depositApiService';
import { DepositSummaryCardType } from '../types';

export const depositSummaryQueryKey = ['depositDashboard', 'summary'];

export const useGetDepositSummary = () => {
	return useQuery<DepositSummaryCardType[]>({
		queryFn: depositApiService.getSummary,
		queryKey: depositSummaryQueryKey
	});
};
