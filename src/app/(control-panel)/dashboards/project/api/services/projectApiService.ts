import { api } from '@/utils/api';
import { ProjectDashboardWidgetType, ProjectType } from '../types';

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

export const projectApiService = {
	getWidgets: async (): Promise<Record<string, ProjectDashboardWidgetType>> => {
		return getJsonWithFallback<Record<string, ProjectDashboardWidgetType>>(
			'project-dashboard/widgets',
			'mock/project-dashboard/widgets'
		);
	},
	getProjects: async (): Promise<ProjectType[]> => {
		return getJsonWithFallback<ProjectType[]>('project-dashboard/projects', 'mock/project-dashboard/projects');
	}
};
