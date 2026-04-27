import { useQuery } from '@tanstack/react-query';
import { kycApiService } from '../services/kycApiService';
import { KycUserRowType } from '../types';

export const kycRowsQueryKey = ['kycDashboard', 'rows'];

export const useGetKycRows = () => {
	return useQuery<KycUserRowType[]>({
		queryFn: kycApiService.getRows,
		queryKey: kycRowsQueryKey
	});
};
