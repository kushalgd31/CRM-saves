import { api } from '@/utils/api';

import { WithdrawHealthType, WithdrawRowType, WithdrawSummaryCardType } from '../types';

export const withdrawApiService = {
	getSummary: async (): Promise<WithdrawSummaryCardType[]> => {
		return api.get('mock/withdraw-dashboard/summary').json();
	},
	getHealth: async (): Promise<WithdrawHealthType> => {
		return api.get('mock/withdraw-dashboard/health').json();
	},

	getRows: async (): Promise<WithdrawRowType[]> => {
		return api.get('mock/withdraw-dashboard/rows').json();
	}
};
