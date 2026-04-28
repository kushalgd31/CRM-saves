import { useQuery } from '@tanstack/react-query';
import { withdrawApiService } from '../services/withdrawApiService';
import { WithdrawHealthType } from '../types';

export const withdrawHealthQueryKey = ['withdrawDashboard', 'health'];

export const useGetWithdrawHealth = () => {
	return useQuery<WithdrawHealthType>({
		queryFn: withdrawApiService.getHealth,
		queryKey: withdrawHealthQueryKey
	});
};
