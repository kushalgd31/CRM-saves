import { api } from '@/utils/api';
import { PlayerCommissionRowType, PlayerCommissionSummaryCardType } from '../types';

export const playerCommissionApiService = {
	getSummary: async (): Promise<PlayerCommissionSummaryCardType[]> => {
		return api.get('mock/player-commission/summary').json();
	},
	getRows: async (): Promise<PlayerCommissionRowType[]> => {
		return api.get('mock/player-commission/rows').json();
	}
};
