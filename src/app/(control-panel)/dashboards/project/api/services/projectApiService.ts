import { api } from '@/utils/api';
import mockDb from '@mock-utils/mockDb.json';
import { ProjectDashboardWidgetType, ProjectType } from '../types';

const getJsonWithFallback = async <T>(primaryPath: string, fallbackPath: string, localFallback: T): Promise<T> => {
	try {
		const response = await api.get(primaryPath);
		const contentType = response.headers.get('content-type') || '';

		if (!contentType.includes('application/json')) {
			throw new Error(`Expected JSON response from ${primaryPath}`);
		}

		return await response.json<T>();
	} catch {
		try {
			return await api.get(fallbackPath).json<T>();
		} catch {
			return localFallback;
		}
	}
};

export const projectApiService = {
	getWidgets: async (): Promise<Record<string, ProjectDashboardWidgetType>> => {
		return getJsonWithFallback<Record<string, ProjectDashboardWidgetType>>(
			'project-dashboard/widgets',
			'mock/project-dashboard/widgets',
			mockDb.project_dashboard_widgets as Record<string, ProjectDashboardWidgetType>
		);
	},
	getProjects: async (): Promise<ProjectType[]> => {
		return getJsonWithFallback<ProjectType[]>(
			'project-dashboard/projects',
			'mock/project-dashboard/projects',
			mockDb.project_dashboard_projects as ProjectType[]
		);
	}
};
