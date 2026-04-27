import { useQuery } from '@tanstack/react-query';
import { depositApiService } from '../services/depositApiService';
import { DepositRowType } from '../types';

export const depositRowsQueryKey = ['depositDashboard', 'rows'];

export const useGetDepositRows = () => {
	return useQuery<DepositRowType[]>({
		queryFn: depositApiService.getRows,
		queryKey: depositRowsQueryKey
	});
};
