import { api } from '@/utils/api';
import { TransactionsRowType } from '../types';

export const transactionsApiService = {
	getRows: async (): Promise<TransactionsRowType[]> => {
		return api.get('mock/transactions-dashboard/rows').json();
	}
};
