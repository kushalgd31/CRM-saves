import { useQuery } from '@tanstack/react-query';
import { depositApiService } from '../services/depositApiService';
import { DepositHealthType } from '../types';

export const depositHealthQueryKey = ['depositDashboard', 'health'];

export const useGetDepositHealth = () => {
	return useQuery<DepositHealthType>({
		queryFn: depositApiService.getHealth,
		queryKey: depositHealthQueryKey
	});
};
