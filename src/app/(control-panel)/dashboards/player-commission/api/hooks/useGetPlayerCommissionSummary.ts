import { useQuery } from '@tanstack/react-query';
import { playerCommissionApiService } from '../services/playerCommissionApiService';
import { PlayerCommissionSummaryCardType } from '../types';

export const playerCommissionSummaryQueryKey = ['playerCommissionDashboard', 'summary'];

export const useGetPlayerCommissionSummary = () => {
	return useQuery<PlayerCommissionSummaryCardType[]>({
		queryFn: playerCommissionApiService.getSummary,
		queryKey: playerCommissionSummaryQueryKey
	});
};
