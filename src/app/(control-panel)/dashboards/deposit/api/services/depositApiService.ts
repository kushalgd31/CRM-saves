import { api } from '@/utils/api';
import { DepositHealthType, DepositRowType, DepositSummaryCardType } from '../types';

export const depositApiService = {
	getSummary: async (): Promise<DepositSummaryCardType[]> => {
		return api.get('mock/deposit-dashboard/summary').json();
	},
	getHealth: async (): Promise<DepositHealthType> => {
		return api.get('mock/deposit-dashboard/health').json();
	},
	getRows: async (): Promise<DepositRowType[]> => {
		return api.get('mock/deposit-dashboard/rows').json();
	}
};
