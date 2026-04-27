import { api } from '@/utils/api';
import { KycSummaryCardType, KycUserRowType } from '../types';

export const kycApiService = {
	getSummary: async (): Promise<KycSummaryCardType[]> => {
		return api.get('mock/kyc-dashboard/summary').json();
	},
	getRows: async (): Promise<KycUserRowType[]> => {
		return api.get('mock/kyc-dashboard/rows').json();
	}
};
