import { useQuery } from '@tanstack/react-query';
import { kycApiService } from '../services/kycApiService';
import { KycSummaryCardType } from '../types';

export const kycSummaryQueryKey = ['kycDashboard', 'summary'];

export const useGetKycSummary = () => {
	return useQuery<KycSummaryCardType[]>({
		queryFn: kycApiService.getSummary,
		queryKey: kycSummaryQueryKey
	});
};
