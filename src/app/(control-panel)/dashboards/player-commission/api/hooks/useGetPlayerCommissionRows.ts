import { useQuery } from '@tanstack/react-query';
import { playerCommissionApiService } from '../services/playerCommissionApiService';
import { PlayerCommissionRowType } from '../types';

export const playerCommissionRowsQueryKey = ['playerCommissionDashboard', 'rows'];

export const useGetPlayerCommissionRows = () => {
	return useQuery<PlayerCommissionRowType[]>({
		queryFn: playerCommissionApiService.getRows,
		queryKey: playerCommissionRowsQueryKey
	});
};
