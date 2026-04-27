import { api } from '@/utils/api';
import { WithdrawRowType } from '../types';

export const withdrawApiService = {
	getRows: async (): Promise<WithdrawRowType[]> => {
		return api.get('mock/withdraw-dashboard/rows').json();
	}
};
