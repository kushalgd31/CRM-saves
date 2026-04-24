import { api } from '@/utils/api';
import { AnalyticsDashboardWidgetType } from '../types';

const getJsonWithFallback = async <T>(primaryPath: string, fallbackPath: string): Promise<T> => {
	try {
		const response = await api.get(primaryPath);
		const contentType = response.headers.get('content-type') || '';

		if (!contentType.includes('application/json')) {
			throw new Error(`Expected JSON response from ${primaryPath}`);
		}

		return await response.json<T>();
	} catch {
		return await api.get(fallbackPath).json<T>();
	}
};

export const analyticsApiService = {
	getWidgets: async (): Promise<Record<string, AnalyticsDashboardWidgetType>> => {
		return getJsonWithFallback<Record<string, AnalyticsDashboardWidgetType>>(
			'analytics-dashboard/widgets',
			'mock/analytics-dashboard/widgets'
		);
	}
};
